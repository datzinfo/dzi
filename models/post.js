"use strict";

module.exports = function(sequelize, DataTypes) {
	var Post = sequelize.define('post', {
		title : DataTypes.STRING,
		author: DataTypes.STRING,
		contents: DataTypes.TEXT('medium'),
		imageurl: DataTypes.STRING,
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
			findById : function(models, postId, showDeleted, onSuccess, onError) {
				
				var includeClause = [];
				if (showDeleted == 'true') {
					includeClause = [{ model: models.comment, as: 'comments',
							include: [{model: models.reply, as: 'replies', 
								include: [{model: models.reply, as: 'replies'}]}]}];
				}
				else {
					includeClause = [{ model: models.comment, as: 'comments',
							where: { deleted: false }, required: false,
							include: [{model: models.reply, as: 'replies',
								where: { deleted: false }, required: false, 
								include: [{model: models.reply, as: 'replies', 
									where: { deleted: false }, required: false}]}]}];
				}
				Post.find({
					where : {
						id : postId
					},
					include: includeClause,
					order : '`comments.updatedAt` DESC, `comments.replies.updatedAt` DESC, `comments.replies.replies.updatedAt` DESC'
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
			
			findAllByCategory : function(models, categoryId, state, onSuccess, onError) {

				var cat = models.category.build();
				
				var whereClause = {};
				if (categoryId && categoryId != "*") {
					whereClause.categoryId = categoryId;
				}
				if (state && state != "*") {
					whereClause.state = state;
				}

				Post.findAll({
					order : '`updatedAt` DESC',
					where : whereClause
				})
				.then(function(posts) {
					onSuccess(posts);
				})
				.catch(function(error) {
					if (onError) {
						onError("Unexpected error encountered getting all posts by id: " + error);
					}
				});
			},
			
			add : function(models, email, categoryId, onSuccess, onError) {
				var title = this.title;
				var contents = this.contents;
				var state = this.state;
				var author = this.author;
				var imageurl = this.imageurl;
				var categoryId;
				var userId;
				
				var usr = models.user.build();
				var cat = models.category.build();

				Promise.all([usr.findAdminIdByEmail(email), cat.findIdById(categoryId)])
				.then(function(results) {
				    if (results[0] && results[1]) {
				    	userId = results[0].id;
						categoryId = results[1].id;
						Post.build({
								title : title,
								author: author,
								contents : contents,
								imageurl : imageurl,
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
							if (!results[0]) {
								onError("You are not authorized to write a post when signed in as " + email);
							}
							else if (!results[1]) {
								onError("Error finding category for new post");
							}
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
			},
						
			update: function(postId, onSuccess, onError) {
				var title = this.title;
				var author = this.author;
				var contents = this.contents;
				var imageurl = this.imageurl;
				var state = this.state;
				var categoryId = this.categoryId;
				
				Post.find({ where: {id: postId} })
				.then(function(post) {
					if (post) {
						post.updateAttributes({
							title : title,
							author: author,
							contents : contents,
							imageurl : imageurl,
							state : state,
							categoryId : categoryId
						})
						.then(
							function(success) {
								if (onSuccess) {
									onSuccess("Post successfully updated.");
								}
							}, 
							function(error) {
								if (onError) {
									onError("Error updating a post: " + error);
								}
							}
						);
					}
					else {
						onError("Error finding post by id " + postId);
					}
				})
				.catch(function(error) {
					if (onError) {
						onError("Unexpected error encountered identifying postId: " + error);
					}
				});
			}
		}
	});

	return Post;
};
