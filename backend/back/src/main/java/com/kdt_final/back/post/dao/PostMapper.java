package com.kdt_final.back.post.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

import com.kdt_final.back.post.domain.PostRequestDTO;
import com.kdt_final.back.post.domain.PostResponseDTO;
import com.kdt_final.back.post.domain.bookMark.PostBookMarkRequestDTO;
import com.kdt_final.back.post.domain.postImage.PostImageRequestDTO;
import com.kdt_final.back.post.domain.postImage.PostImageResponseDTO;
import com.kdt_final.back.post.domain.postLike.PostLikeRequestDTO;
import com.kdt_final.back.post.domain.postLike.PostLikeResponseDTO;

@Mapper
public interface PostMapper {
    
    @Options(useGeneratedKeys = true, keyProperty = "postId")
    public void saveRow(PostRequestDTO params);

    public void savePostImage(PostImageRequestDTO params);

    public List<PostResponseDTO> getAllPost();

    public List<PostResponseDTO> getPost(String local);
    
    public PostResponseDTO viewPost(int postId);

    public List<PostImageResponseDTO> getPostImages(int postId);

    public void likeSave (PostLikeRequestDTO params);

    public void likeDelete (PostLikeRequestDTO params);

    public Integer likeCheck (PostLikeRequestDTO params);

    public Integer countLike(Integer postId );

    public void bookMarkSave (PostBookMarkRequestDTO params);
}
