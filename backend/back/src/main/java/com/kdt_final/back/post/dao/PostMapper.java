package com.kdt_final.back.post.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

import com.kdt_final.back.post.domain.PostRequestDTO;
import com.kdt_final.back.post.domain.postImage.PostImageRequestDTO;

@Mapper
public interface PostMapper {
    
    @Options(useGeneratedKeys = true, keyProperty = "post_id")
    public void saveRow(PostRequestDTO params);

    public void savePostImage(PostImageRequestDTO params);
}
