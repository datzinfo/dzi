"use strict";

module.exports = function(sequelize, DataTypes) {
	var Category = sequelize.define('category', {
		type : {type: DataTypes.STRING, unique: true},
		desc : DataTypes.STRING
	}, {
		classMethods : {
			associate : function(models) {
				Category.belongsTo(models.blog);
				Category.hasMany(models.post, {
					as : 'posts'
				});
			}
		},

		instanceMethods : {
			findIdByType : function(type) {
				return Category.find({
					where : {
						type : type
					},
					attributes : [ 'id' ]
				});
			},
			
			getAllCategories : function(onSuccess, onError) {
				Category.findAll({
					attributes : [ 'type', 'desc' ]
				})
				.then(
					function(categories) {
						onSuccess(categories);
					},
					function(error) {
						onError(error);
					});
			}			
		}
	});

	return Category;
};
