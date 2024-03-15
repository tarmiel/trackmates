import nodemailer, { type Transporter } from "nodemailer";

type Constructor = {
	logger: boolean;
	requireTLS: boolean;
	secure: boolean;
	senderEmail: string;
	senderName: string;
	senderPassword: string;
	service: string;
};

class Mail {
	private senderEmail: string;
	private senderName: string;

	private transporter: Transporter;

	public constructor({
		logger,
		requireTLS,
		secure,
		senderEmail,
		senderName,
		senderPassword,
		service,
	}: Constructor) {
		this.senderEmail = senderEmail;
		this.senderName = senderName;

		this.transporter = nodemailer.createTransport({
			auth: {
				pass: senderPassword,
				user: senderEmail,
			},
			logger,
			requireTLS,
			secure,
			service,
		});
	}

	public async send({
		email: to,
		subject,
		text,
	}: {
		email: string;
		subject: string;
		text: string;
	}): Promise<boolean> {
		const from = `${this.senderName} <${this.senderEmail}>`;
		await this.transporter.sendMail({ from, subject, text, to });

		return true;
	}
}

export { Mail };
