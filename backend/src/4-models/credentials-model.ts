import Joi from "joi"

class CredentialsModel {
    public username: string
    public password: string

    public constructor(credetials: CredentialsModel) {
        this.username = credetials.username
        this.password = credetials.password
    }

    public static validationSchema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required().min(4)
    })

    public validate(): string {
        const result = CredentialsModel.validationSchema.validate(this)
        return result.error?.message
    }
}

export default CredentialsModel