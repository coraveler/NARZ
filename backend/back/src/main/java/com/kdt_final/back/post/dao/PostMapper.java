package com.kdt_final.back.post.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

import com.kdt_final.back.post.domain.PostRequestDTO;
import com.kdt_final.back.post.domain.PostResponseDTO;
import com.kdt_final.back.post.domain.postImage.PostImageRequestDTO;
import com.kdt_final.back.post.domain.postImage.PostImageResponseDTO;

@Mapper
public interface PostMapper {
    
    @Options(useGeneratedKeys = true, keyProperty = "postId")
    public void saveRow(PostRequestDTO params);

    public void savePostImage(PostImageRequestDTO params);

    public List<PostResponseDTO> getAllPost();

    public List<PostResponseDTO> getPost(String local);
    
    public PostResponseDTO viewPost(int postId);

    public List<PostImageResponseDTO> getPostImages(int postId);
}
