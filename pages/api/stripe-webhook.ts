import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Cors from "micro-cors";
import transporter from "lib/nodemailer";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const generateEmailContent = (
  email: string,
  checkout_amount_total: number,
  emailContact: string,
  line_items: Array<any>
) => {
  const products = line_items.map((product) => {
    return {
      description: product.description,
      quantity: product.quantity,
      amount_total: product.amount_total / 100,
    };
  });

  const stringData = products.reduce(
    (str, product) =>
      Object.entries(product).reduce(
        (str, [key, value]) => (str += `${key}: \n${value} \n \n`),
        ""
      ),
    ""
  );

  const htmlData = products.reduce(
    (str, { description, quantity, amount_total }) => {
      return (str += `<div class="u-row-container" style="padding: 0px; background-color: transparent"> <div class="u-row" style=" margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent; " > <div style=" border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent; " > <div class="u-col u-col-50" style=" max-width: 320px; min-width: 250px; display: table-cell; vertical-align: top; " > <div style=" height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <div style=" height: 100%; padding: 0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <table style="font-family: arial, helvetica, sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" > <tbody> <tr> <td style=" overflow-wrap: break-word; word-break: break-word; padding: 30px 10px 66px 20px; font-family: arial, helvetica, sans-serif; " align="left" > <div style=" line-height: 140%; text-align: left; word-wrap: break-word; " > <p style="font-size: 14px; line-height: 140%"> <span style=" font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px; " ><strong>${description} </strong ><span style=" color: #666666; font-size: 14px; line-height: 19.6px; " > x${quantity}</span ></span ><span style=" font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px; " ></span> </p></div></td></tr></tbody> </table> </div></div></div><div class="u-col u-col-50" style=" max-width: 320px; min-width: 250px; display: table-cell; vertical-align: top; " > <div style=" background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <div style=" height: 100%; padding: 0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <table style="font-family: arial, helvetica, sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" > <tbody> <tr> <td style=" overflow-wrap: break-word; word-break: break-word; padding: 30px 10px 66px 20px; font-family: arial, helvetica, sans-serif; " align="left" > <div style=" line-height: 140%; text-align: left; word-wrap: break-word; " > <p style="font-size: 14px; line-height: 140%"> <strong ><span style=" font-family: Montserrat, sans-serif; font-size: 16px; line-height: 22.4px; " >$${amount_total}</span ></strong > </p></div></td></tr></tbody> </table> </div></div></div></div></div></div><div class="u-row-container" style="padding: 0px; background-color: transparent"> <div class="u-row" style=" margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent; " > <div style=" border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent; " > <div class="u-col u-col-100" style=" max-width: 320px; min-width: 500px; display: table-cell; vertical-align: top; " > <div style=" background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <div style=" height: 100%; padding: 0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <table style="font-family: arial, helvetica, sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" > <tbody> <tr> <td style=" overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial, helvetica, sans-serif; " align="left" > <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style=" border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 2px solid #e7e7e7; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " > <tbody> <tr style="vertical-align: top"> <td style=" word-break: break-word; border-collapse: collapse !important; vertical-align: top; font-size: 0px; line-height: 0px; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " > <span>&#160;</span> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></div></div></div></div></div>`);
    },
    ""
  );

  return {
    text: stringData,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <meta name="x-apple-disable-message-reformatting"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <title></title> <style type="text/css"> @media only screen and (min-width: 520px){.u-row{width: 500px !important;}.u-row .u-col{vertical-align: top;}.u-row .u-col-22p74{width: 113.7px !important;}.u-row .u-col-23p13{width: 115.65px !important;}.u-row .u-col-50{width: 250px !important;}.u-row .u-col-54p13{width: 270.65px !important;}.u-row .u-col-100{width: 500px !important;}}@media (max-width: 520px){.u-row-container{max-width: 100% !important; padding-left: 0px !important; padding-right: 0px !important;}.u-row .u-col{min-width: 320px !important; max-width: 100% !important; display: block !important;}.u-row{width: 100% !important;}.u-col{width: 100% !important;}.u-col > div{margin: 0 auto;}}body{margin: 0; padding: 0;}table, tr, td{vertical-align: top; border-collapse: collapse;}p{margin: 0;}.ie-container table, .mso-container table{table-layout: fixed;}*{line-height: inherit;}a[x-apple-data-detectors="true"]{color: inherit !important; text-decoration: none !important;}table, td{color: #000000;}</style> <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet" type="text/css"/> </head> <body class="clean-body u_body" style=" margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #ffffff; color: #000000; " > <table style=" border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; min-width: 320px; margin: 0 auto; background-color: #ffffff; width: 100%; " cellpadding="0" cellspacing="0" > <tbody> <tr style="vertical-align: top"> <td style=" word-break: break-word; border-collapse: collapse !important; vertical-align: top; " > <div class="u-row-container" style="padding: 0px; background-color: transparent" > <div class="u-row" style=" margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent; " > <div style=" border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent; " > <div class="u-col u-col-100" style=" max-width: 320px; min-width: 500px; display: table-cell; vertical-align: top; " > <div style=" background-color: #f7fbfc; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <div style=" height: 100%; padding: 0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <table style="font-family: arial, helvetica, sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" > <tbody> <tr> <td style=" overflow-wrap: break-word; word-break: break-word; padding: 40px 10px 10px; font-family: arial, helvetica, sans-serif; " align="left" > <table width="100%" cellpadding="0" cellspacing="0" border="0" > <tr> <td style=" padding-right: 0px; padding-left: 0px; " align="center" > <img align="center" border="0" src="https://res.cloudinary.com/davixx5su/image/upload/v1670005747/folder/e-commerce_ctrsgi.png" alt="Cart Icon" title="Cart Icon" style=" outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 15%; max-width: 72px; " width="72"/> </td></tr></table> </td></tr></tbody> </table> <table style="font-family: arial, helvetica, sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" > <tbody> <tr> <td style=" overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial, helvetica, sans-serif; " align="left" > <div style=" line-height: 140%; text-align: center; word-wrap: break-word; " > <p style="font-size: 14px; line-height: 140%"> <span style=" font-size: 18px; line-height: 25.2px; font-family: Montserrat, sans-serif; " ><strong ><span style=" line-height: 25.2px; font-size: 18px; " >Thank you for your purchase!</span ></strong ></span > </p></div></td></tr></tbody> </table> <table style="font-family: arial, helvetica, sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" > <tbody> <tr> <td style=" overflow-wrap: break-word; word-break: break-word; padding: 0px 10px 10px; font-family: arial, helvetica, sans-serif; " align="left" > <div style=" line-height: 140%; text-align: center; word-wrap: break-word; " > <p style="font-size: 14px; line-height: 140%"> <span style=" font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px; " >Hi ${email}, we're getting your order ready to be shipped.</span > </p><p style="font-size: 14px; line-height: 140%"> <span style=" font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px; " >We will notify you when it has been sent.</span > </p></div></td></tr></tbody> </table> <table style="font-family: arial, helvetica, sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" > <tbody> <tr> <td style=" overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial, helvetica, sans-serif; " align="left" > <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style=" border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 2px solid #e7e7e7; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " > <tbody> <tr style="vertical-align: top"> <td style=" word-break: break-word; border-collapse: collapse !important; vertical-align: top; font-size: 0px; line-height: 0px; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " > <span>&#160;</span> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></div></div></div></div></div><div class="u-row-container" style="padding: 0px; background-color: transparent" > <div class="u-row" style=" margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent; " > <div style=" border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent; " > <div class="u-col u-col-100" style=" max-width: 320px; min-width: 500px; display: table-cell; vertical-align: top; " > <div style=" background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <div style=" height: 100%; padding: 0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <table style="font-family: arial, helvetica, sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" > <tbody> <tr> <td style=" overflow-wrap: break-word; word-break: break-word; padding: 20px 10px 10px; font-family: arial, helvetica, sans-serif; " align="left" > <div style=" line-height: 140%; text-align: center; word-wrap: break-word; " > <p style="font-size: 14px; line-height: 140%"> <strong ><span style=" font-family: Montserrat, sans-serif; font-size: 16px; line-height: 22.4px; " >Order summary</span ></strong > </p></div></td></tr></tbody> </table> <table style="font-family: arial, helvetica, sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" > <tbody> <tr> <td style=" overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial, helvetica, sans-serif; " align="left" > <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style=" border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 2px solid #e7e7e7; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " > <tbody> <tr style="vertical-align: top"> <td style=" word-break: break-word; border-collapse: collapse !important; vertical-align: top; font-size: 0px; line-height: 0px; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " > <span>&#160;</span> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></div></div></div></div></div>${htmlData}<div class="u-row-container" style="padding: 0px; background-color: transparent" > <div class="u-row" style=" margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent; " > <div style=" border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent; " > <div class="u-col u-col-54p13" style=" max-width: 320px; min-width: 270.65px; display: table-cell; vertical-align: top; " > <div style=" background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <div style=" height: 100%; padding: 0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <table style="font-family: arial, helvetica, sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" > <tbody> <tr> <td style=" overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial, helvetica, sans-serif; " align="left" > <div style=" color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; " > <p style="font-size: 14px; line-height: 140%"> . </p><p style="font-size: 14px; line-height: 140%"> &nbsp; </p></div></td></tr></tbody> </table> </div></div></div><div class="u-col u-col-23p13" style=" max-width: 320px; min-width: 115.65px; display: table-cell; vertical-align: top; " > <div style=" background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <div style=" height: 100%; padding: 0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <table style="font-family: arial, helvetica, sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" > <tbody> <tr> <td style=" overflow-wrap: break-word; word-break: break-word; padding: 10px 10px 11px; font-family: arial, helvetica, sans-serif; " align="left" > <div style=" line-height: 140%; text-align: left; word-wrap: break-word; " > <p style="font-size: 14px; line-height: 140%"> <strong ><span style=" font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px; " >Total</span ></strong > </p></div></td></tr></tbody> </table> </div></div></div><div class="u-col u-col-22p74" style=" max-width: 320px; min-width: 113.7px; display: table-cell; vertical-align: top; " > <div style=" background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <div style=" height: 100%; padding: 0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <table style="font-family: arial, helvetica, sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" > <tbody> <tr> <td style=" overflow-wrap: break-word; word-break: break-word; padding: 10px 10px 11px; font-family: arial, helvetica, sans-serif; " align="left" > <div style=" line-height: 140%; text-align: left; word-wrap: break-word; " > <p style="font-size: 14px; line-height: 140%"> <span style=" font-size: 16px; line-height: 22.4px; " ><strong ><span style=" font-family: Montserrat, sans-serif; line-height: 22.4px; font-size: 16px; " >$${checkout_amount_total}</span ></strong ></span > </p></div></td></tr></tbody> </table> </div></div></div></div></div></div><div class="u-row-container" style="padding: 0px; background-color: transparent" > <div class="u-row" style=" margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent; " > <div style=" border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent; " > <div class="u-col u-col-100" style=" max-width: 320px; min-width: 500px; display: table-cell; vertical-align: top; " > <div style=" background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <div style=" height: 100%; padding: 0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <table style="font-family: arial, helvetica, sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" > <tbody> <tr> <td style=" overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial, helvetica, sans-serif; " align="left" > <table height="0px" align="right" border="0" cellpadding="0" cellspacing="0" width="47%" style=" border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 2px solid #e7e7e7; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " > <tbody> <tr style="vertical-align: top"> <td style=" word-break: break-word; border-collapse: collapse !important; vertical-align: top; font-size: 0px; line-height: 0px; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " > <span>&#160;</span> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></div></div></div></div></div><div class="u-row-container" style="padding: 0px; background-color: transparent" > <div class="u-row" style=" margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent; " > <div style=" border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent; " > <div class="u-col u-col-100" style=" max-width: 320px; min-width: 500px; display: table-cell; vertical-align: top; " > <div style=" background-color: #f7fbfc; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <div style=" height: 100%; padding: 0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; " > <table style="font-family: arial, helvetica, sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" > <tbody> <tr> <td style=" overflow-wrap: break-word; word-break: break-word; padding: 20px 10px 10px; font-family: arial, helvetica, sans-serif; " align="left" > <div style=" line-height: 140%; text-align: center; word-wrap: break-word; " > <p style="font-size: 14px; line-height: 140%"> <span style=" font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px; " >If you have any questions</span ><span style=" font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px; " > <strong>contact us at </strong >${emailContact}</span ><span style=" font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px; " ></span> </p></div></td></tr></tbody> </table> </div></div></div></div></div></div></td></tr></tbody> </table> </body></html>`,
  };
};

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);
      res.status(400).send(`Webhook Error: ${errorMessage}`);
      return;
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const eventSession = event.data.object as Stripe.Checkout.Session;
      const id = eventSession.id;
      const session: Stripe.Checkout.Session =
        await stripe.checkout.sessions.retrieve(id as string, {
          expand: ["payment_intent", "line_items"],
        });
      if (!session.line_items?.data)
        return res.status(500).json({ message: "Products not found" });
      if (!session.customer_details?.email)
        return res.status(500).json({ message: "Customer email not found" });
      if (!session.amount_total)
        return res.status(500).json({ message: "Total amount not found" });
      var mailOptions = {
        from: "Remitente",
        to: session.customer_details.email,
        subject: "Testing a succeded payment",
        ...generateEmailContent(
          session.customer_details?.email,
          session.amount_total / 100,
          "tech.shop.grp05@gmail.com",
          session.line_items?.data
        ),
      };
      await transporter.sendMail(mailOptions as any, (err, info) => {
        if (err) {
          return res.status(500).json(err.message);
        } else {
          console.log("Email sended");
        }
      });
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default cors(webhookHandler as any);
