const {Schema, model} = require("mongoose");

const schema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		products: [{
			product: {
				type: Schema.Types.ObjectId,
				ref: 'Product',
				required: true
			},
			quantity: {
				type: Number,
				required: true
			}
		}],
		total: {
			type: Number,
			required: true
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("Order", schema);
