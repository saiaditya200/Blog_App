import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { userAuthorContextObj } from '../../contexts/UserAuthorContext';
import { useNavigate } from 'react-router-dom';

function PostArticle() {
  const { register, handleSubmit } = useForm();
  const { currentUser } = useContext(userAuthorContextObj);
  const navigate = useNavigate();

  async function postArticle(articleObj) {
    const authorData = {
      nameOfAuthor: currentUser.firstName,
      email: currentUser.email,
      profileImageUrl: currentUser.profileImageUrl,
    };

    articleObj.authorData = authorData;
    articleObj.articleId = Date.now();
    let currentDate = new Date();
    
    articleObj.dateOfCreation = currentDate.toLocaleString();
    articleObj.dateOfModification = currentDate.toLocaleString();
    articleObj.comments = [];
    articleObj.isArticleActive = true;

    try {
      const res = await axios.post('http://localhost:3000/author-api/article', articleObj);
      if (res.status === 201) {
        navigate(`/author-profile/${currentUser.email}/articles`);
      }
    } catch (error) {
      console.error("Error posting article:", error);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8 col-md-8 col-sm-10">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3" style={{ color: "goldenrod" }}>
                Write an Article
              </h2>
            </div>
            <div className="card-body bg-light">
              <form onSubmit={handleSubmit(postArticle)}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" {...register("title")} />
                </div>
                <div className="mb-4">
                  <label htmlFor="category" className="form-label">Select a category</label>
                  <select {...register("category")} id="category" className="form-select" defaultValue="">
                    <option value="" disabled>--categories--</option>
                    <option value="programming">Programming</option>
                    <option value="AI&ML">AI & ML</option>
                    <option value="database">Database</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="form-label">Content</label>
                  <textarea {...register("content")} className="form-control" id="content" rows="10"></textarea>
                </div>
                <div className="text-end">
                  <button type="submit" className="add-article-btn">Post</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostArticle;
