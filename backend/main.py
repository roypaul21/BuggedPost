from flask import request, jsonify, send_from_directory
from config import app
from models import BlogsModels
from contr import BlogController
from flask_cors import cross_origin

@app.route("/api/blogs", methods=["GET"])
@cross_origin()
def displayBlogs():
    blog_list = BlogController.json_blogs(BlogsModels.displayBlog())
    return jsonify({"blogs": blog_list})

@app.route("/api/blogs/<string:search_input>", methods=["GET"])
@cross_origin()
def SearchBlogs(search_input):
    blog_list = BlogController.json_blogs(BlogsModels.searchBlog(search_input))
    return jsonify({"blogs": blog_list})

@app.route("/api/create_blogs", methods=["POST"])
@cross_origin()
def createBlogs():
    blog_title = request.json.get("blog_title")
    blog_content = request.json.get("blog_content")

    if not blog_title or not blog_content:
        return (jsonify({"message": "Fill Up All Input Fields!"}), 
        400,
        )

    try: 
        BlogsModels.createBlogTable()
        BlogsModels.createBlog(blog_title, blog_content)
    except Exeption as e:
        return (jsonify({"message": str(e)}), 400)
    
    return jsonify({"message": "Blog Created Successfully!"}), 201

@app.route("/api/update_blogs/<int:blog_id>", methods=["PATCH"])
@cross_origin()
def updateBlog(blog_id):

    blogs = BlogsModels.getBlog(blog_id) 
    data = request.json
    blog_title = data.get("blog_title", blogs[1])
    blog_content = data.get("blog_content", blogs[2])
    
    if BlogController.isBlogExist(blog_id):
        return (jsonify({"message": "Blog Doesn't Exist!"}), 
        400,
        ) 
    
    if BlogController.BlogInputEmpty(blog_title, blog_content):
        return (jsonify({"message": "Fill Up Input All Fields!"}), 
        400,
        ) 
    
    try: 
        BlogsModels.updateBlog(blog_id, blog_title, blog_content)

    except Exeption as e:
        return (jsonify({"message": str(e)}), 400)
    
    return jsonify({"message": "Blog Updated Successfully!"}), 200

@app.route("/api/delete_blogs/<int:blog_id>", methods=["DELETE"])
@cross_origin()
def deleteBlog(blog_id):    
    try: 
        BlogsModels.deleteBlog(blog_id)

    except Exeption as e:
        return (jsonify({"message": str(e)}), 400)
    
    return jsonify({"message": "Blog Removed Successfully!"}), 200

@app.route('/')
def serve_static_files():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(debug=True)