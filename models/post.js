"use strict";

module.exports = function(sequelize, DataTypes) {
	var Post = sequelize.define('post', {
		title : DataTypes.STRING,
		author: DataTypes.STRING,
		contents: DataTypes.TEXT,
		state : {
		    type:   DataTypes.ENUM,
		    values: ['draft', 'published', 'archive']
		},
	}, {
		classMethods : {
			associate : function(models) {
				Post.belongsTo(models.category);
				Post.hasMany(models.comment, {
					as: 'comments'
				});
			}
		},

		instanceMethods : {
			findById : function(models, postId, onSuccess, onError) {
				Post.find({
					where : {
						id : postId,
						state : 'published'
					},
					include: [ 
						{ model: models.comment, as: 'comments', 
							include: [models.user]}
					],
					order : '`comments.updatedAt` DESC'
				})
				.then(function(post) {
					onSuccess(post);
				})				
				.catch(function(error) {
					if (onError) {
						onError("Unexpected error encountered finding post: " + error);
					}
				});
			},
			
			findAllByCategory : function(models, categoryType, onSuccess, onError) {

				var cat = models.category.build();
				
				if (categoryType && categoryType != "*") {
					cat.findIdByType(categoryType)
					.then (function(category) {
						console.log("%%% selective asc");
						Post.findAll({
							order : '`updatedAt` DESC',
							where : {
								categoryId : category.id,
								state : 'published'
							}
						})
						.then(function(posts) {
							onSuccess(posts);
						});
					})
					.catch(function(error) {
						if (onError) {
							onError("Unexpected error encountered identifying category: " + error);
						}
					});
				}
				else {
					console.log("%%% selective asc");
					Post.findAll({
						order : '`updatedAt` DESC',
						where : {
							state : 'published'
						},
						include: [ 
							{ model: models.comment, as: 'comments' }
						]
					})
					.then(function(posts) {
						onSuccess(posts);
					})				
					.catch(function(error) {
						if (onError) {
							onError("Unexpected error encountered identifying category: " + error);
						}
					});
				}
			},
			
			add : function(models, email, categoryType, onSuccess, onError) {
				var title = this.title;
				var contents = this.contents;
				var state = this.state;
				var author = this.author;
				var categoryId;
				var userId;
				
				var usr = models.user.build();
				var cat = models.category.build();

				Promise.all([usr.findAdminIdByEmail(email), cat.findIdByType(categoryType)])
				.then(function(results) {
				    if (results[0] && results[1]) {
				    	userId = results[0].id;
						categoryId = results[1].id;
						Post.build({
								title : title,
								author: author,
								contents : contents,
								state : state,
								userId : userId,
								categoryId : categoryId
							}).save().then(
								function(success) {
									if (onSuccess) {
										onSuccess("Post successfully saved.");
									}
								}, 
								function(error) {
									if (onError) {
										onError("Error adding a post: " + error);
									}
								}
							);
				    }
				    else {
						if (onError) {
							onError("You are not authorized to write a post when signed in as " + email);
						}
				    }
				  })
			  .catch(function(error) {
					if (onError) {
						onError("Unexpected error encountered identifying author: " + error);
					}
			  });
			},
			
			getStateEnum : function() {
				return Post.rawAttributes.state.values;
			}
		}
	});

	return Post;
};
