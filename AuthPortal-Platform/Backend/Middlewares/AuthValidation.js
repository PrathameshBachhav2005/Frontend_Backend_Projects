import Joi from "joi";

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(2).trim().regex(/^[a-zA-Z\s]+$/).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])'), 'new-password').max(16).required().messages({
   
      'string.min':
        'Password must be at least 8 characters long',

      'string.max':
        'Password must not exceed 16 characters',

      'string.pattern.name':
        'Password must contain uppercase, lowercase, number and special character like Pass@1234'
    })

    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details.map(err => err.message)
        });
    }
    next();
}


const loginValidation = (req, res, next) => {

    const schema = Joi.object({
        email: Joi.string().email().lowercase().required().messages({

      'string.email':
        'Please enter a valid email address',

    }),
        password: Joi.string().min(8).max(16).required().messages({

      'string.min':
        'Password must be at least 8 characters long'
    })
    })
    const { error } = schema.validate(req.body);

    if (error) {
         return res.status(400).send({
            message: error.details.map(err => err.message)
        });
    }
    next();
}


const forgotPasswordValidation = (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required().messages({
                "string.email": "Invalid email format",
                "any.required": "Email is required"
            }),
            newPassword: Joi.string().min(8).max(16).required().messages({
                "string.min": "Password must be at least 8 characters",
                "string.max": "Password must be at most 16 characters",
                "any.required": "New password is required"
            })
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message)
            });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export {
    signupValidation,
    loginValidation,
    forgotPasswordValidation
}