import { IOrder } from '../models/Order.model';

export const generateInvoiceHtml = (order: IOrder): string => {
    const itemsHtml = order.items.map(item => `
        <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${item.name} (${item.size})</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right;">₹${item.price.toLocaleString()}</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right;">₹${(item.price * item.quantity).toLocaleString()}</td>
        </tr>
    `).join('');

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Inter', sans-serif; color: #111; line-height: 1.6; margin: 0; padding: 40px; }
                .header { display: flex; justify-content: space-between; margin-bottom: 40px; border-bottom: 2px solid #000; padding-bottom: 20px; }
                .logo { font-size: 24px; font-weight: bold; letter-spacing: 0.2em; }
                .status { text-transform: uppercase; font-size: 10px; font-weight: bold; padding: 4px 8px; background: #eee; }
                .details { display: flex; justify-content: space-between; margin-bottom: 40px; }
                .col { width: 45%; }
                .label { font-size: 10px; text-transform: uppercase; color: #888; margin-bottom: 4px; font-weight: bold; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
                th { text-align: left; font-size: 10px; text-transform: uppercase; color: #888; border-bottom: 1px solid #000; padding-bottom: 8px; }
                .totals { margin-left: auto; width: 300px; }
                .total-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
                .grand-total { font-weight: bold; font-size: 18px; border-top: 1px solid #000; padding-top: 8px; margin-top: 12px; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">HOUSE OF THREE BROTHERS</div>
                <div>
                    <div style="text-align: right;">
                        <div class="label">Invoice #</div>
                        <div style="font-weight: bold;">${order.orderNumber}</div>
                        <div class="label" style="margin-top: 8px;">Date</div>
                        <div>${new Date(order.createdAt).toLocaleDateString()}</div>
                    </div>
                </div>
            </div>

            <div class="details">
                <div class="col">
                    <div class="label">Billed To</div>
                    <div style="font-weight: bold;">${order.fullName}</div>
                    <div>${order.billingAddress.line1}</div>
                    ${order.billingAddress.line2 ? `<div>${order.billingAddress.line2}</div>` : ''}
                    <div>${order.billingAddress.city}, ${order.billingAddress.state} ${order.billingAddress.pincode}</div>
                    <div>${order.email} | ${order.mobile}</div>
                </div>
                <div class="col">
                    <div class="label">Shipping To</div>
                    <div style="font-weight: bold;">${order.fullName}</div>
                    <div>${order.shippingAddress.line1}</div>
                    ${order.shippingAddress.line2 ? `<div>${order.shippingAddress.line2}</div>` : ''}
                    <div>${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.pincode}</div>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th style="text-align: center;">Qty</th>
                        <th style="text-align: right;">Price</th>
                        <th style="text-align: right;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>

            <div class="totals">
                <div class="total-row">
                    <span>Subtotal</span>
                    <span>₹${order.subtotal.toLocaleString()}</span>
                </div>
                <div class="total-row">
                    <span>Shipping</span>
                    <span>₹${order.shippingFee.toLocaleString()}</span>
                </div>
                <div class="total-row">
                    <span>Tax (GST)</span>
                    <span>₹${order.tax.toLocaleString()}</span>
                </div>
                ${order.discount > 0 ? `
                <div class="total-row" style="color: #e53e3e;">
                    <span>Discount</span>
                    <span>-₹${order.discount.toLocaleString()}</span>
                </div>
                ` : ''}
                <div class="total-row grand-total">
                    <span>Total</span>
                    <span>₹${order.total.toLocaleString()}</span>
                </div>
            </div>

            <div style="margin-top: 80px; font-size: 10px; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
                Thank you for choosing House of Three Brothers. For support, contact concierge@houseofthreebrothers.com
            </div>
        </body>
        </html>
    `;
};
