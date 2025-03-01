"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Params {
  to: string;
  subject: string;
  text: string;
}

export const sendEmail = async ({ to, subject, text }: Params) => {
  try {
    if (!process.env.EMAIL_FROM)
      throw new Error("EMAIL_FROM environment variable is not set.");
    if (!process.env.RESEND_API_KEY)
      throw new Error("RESEND_API_KEY environment variable is not set.");

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: to.toLowerCase().trim(),
      subject: subject.trim(),
      text: text.trim(),
    });

    if (error) throw new Error("Failed to send email");
    return data;
  } catch (error) {
    throw error;
  }
};
