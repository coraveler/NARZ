package com.kdt_final.back.post.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

import com.kdt_final.back.post.domain.PostRequestDTO;
import com.kdt_final.back.post.domain.PostResponseDTO;
import com.kdt_final.back.post.domain.postBookMark.PostBookMarkRequestDTO;
import com.kdt_final.back.post.domain.postImage.PostImageRequestDTO;
import com.kdt_final.back.post.domain.postImage.PostImageResponseDTO;
import com.kdt_final.back.post.domain.postLike.PostLikeRequestDTO;

@Mapper
public interface PostMapper {
    
    @Options(useGeneratedKeys = true, keyProperty = "postId")
    public void saveRow(PostRequestDTO params);

    public void savePostImage(PostImageRequestDTO params);

    // @Options(useGeneratedKeys = true, keyProperty = "postId")
    public void editRow(PostRequestDTO params);

    public void delete(Integer postId);

    public void deletePostImage(PostRequestDTO params);

    public List<PostResponseDTO> getAllPost();

    public List<PostResponseDTO> getPost(String local);
    
    public PostResponseDTO viewPost(int postId);

    public List<PostImageResponseDTO> getPostImages(int postId);

    public void likeSave (PostLikeRequestDTO params);

    public void likeDelete (PostLikeRequestDTO params);

    public Integer likeCheck (PostLikeRequestDTO params);

    public Integer countLike(Integer postId );

    public void bookMarkSave (PostBookMarkRequestDTO params);

    public void bookMarkDelete (PostBookMarkRequestDTO params);

    public Integer bookMarkCheck (PostBookMarkRequestDTO params);

    public List<PostResponseDTO> getAllBookMark(int userId);

    public List<PostResponseDTO> getBookMark(PostRequestDTO params);

    public List<PostResponseDTO> getAllTravelog(int userId);

    public List<PostResponseDTO> getTravelog(PostRequestDTO params);

    public List<PostResponseDTO> getAllFollow(int userId);

    public List<PostResponseDTO> getFollow(PostRequestDTO params);
}
