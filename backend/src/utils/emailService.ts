import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendOrderConfirmationEmail = async (order: any) => {
    try {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.warn('⚠️ SMTP credentials not found. Skipping order confirmation email.');
            return;
        }

        const itemsHtml = order.items.map((item: any) => `
            <tr>
                <td>${item.name} (${item.size})</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>₹${item.price * item.quantity}</td>
            </tr>
        `).join('');

        const mailOptions = {
            from: `"House of Three Brothers" <${process.env.SMTP_USER}>`,
            to: order.email,
            subject: `Order Confirmed - ${order.orderNumber}`,
            html: `
                <h1>Thank you for your order!</h1>
                <p>Hi ${order.fullName},</p>
                <p>Your order <strong>${order.orderNumber}</strong> has been successfully placed.</p>
                <h3>Order Summary</h3>
                <table border="1" cellpadding="5" style="border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3"><strong>Total Amount</strong></td>
                            <td><strong>₹${order.total}</strong></td>
                        </tr>
                    </tfoot>
                </table>
                <p>Shipping to:</p>
                <address>
                    ${order.shippingAddress.line1}<br>
                    ${order.shippingAddress.line2 ? order.shippingAddress.line2 + '<br>' : ''}
                    ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}
                </address>
                <p>We will notify you once your order is shipped.</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Order confirmation email sent to ${order.email}`);
    } catch (error) {
        console.error('❌ Error sending order confirmation email:', error);
    }
};
