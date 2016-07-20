"use strict";

module.exports = function(sequelize, DataTypes) {
	var Blog = sequelize.define('blog', {
		name : {type: DataTypes.STRING, unique: true},
		desc : DataTypes.STRING,
	}, {
		classMethods : {
			associate : function(models) {
				Blog.hasMany(models.category, {
					as: 'categories'
				});
			}
		},

		instanceMethods : {
		}
	});

	return Blog;
};
