export const sendOrderConfirmationEmail = async (order: any) => {
    // nodemailer removed as per user request
    console.warn(`⚠️ nodemailer removed. Skipping order confirmation email for ${order.email}.`);
    console.log(`[ORDER INFO] ${order.orderNumber} for ${order.fullName}`);
};
