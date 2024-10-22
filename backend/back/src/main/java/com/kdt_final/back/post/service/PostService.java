package com.kdt_final.back.post.service;

import java.io.File;
import java.util.UUID;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kdt_final.back.post.dao.PostMapper;
import com.kdt_final.back.post.domain.PostRequestDTO;
import com.kdt_final.back.post.domain.PostResponseDTO;
import com.kdt_final.back.post.domain.postImage.PostImageRequestDTO;

@Service
public class PostService {

    
    @Autowired
    private PostMapper postMapper;

    public void save(PostRequestDTO params, MultipartFile[] images) {
        System.out.println("Debug >>>> service save() - PostMapper: " + postMapper);
        
        // 이미지 업로드 처리
        if (images != null && images.length > 0) {

            uploadImages(images, params);
        } else {
            System.out.println("No images uploaded.");
        }
    }

    private void uploadImages(MultipartFile[] images, PostRequestDTO params) {
        String uploadDir = getUploadDir();
        File userDir = new File(uploadDir);
        userDir.mkdirs(); // 디렉토리가 없으면 생성

        for (int i = 0; i < images.length; i++) {
            MultipartFile image = images[i];
            String result = savePostImage(userDir, image, params, i + 1);
            System.out.println(result);
        }
    }

    private String getUploadDir() {
        String baseDir = System.getProperty("user.dir");
        return baseDir + "/uploads/images/post/";
    }

    private String savePostImage(File userDir, MultipartFile image, PostRequestDTO params, int num) {
        try {
            String randomFileName = UUID.randomUUID().toString() + ".png";
            File dest = new File(userDir, randomFileName);
            image.transferTo(dest);

            String relativePath = "uploads/images/post/" + randomFileName;
            if (num == 1) {
                params.setHeaderImg(relativePath); // 첫 번째 이미지를 헤더 이미지로 설정
                // 데이터베이스에 포스트 저장
                postMapper.saveRow(params);
            }
            
            saveImageToDatabase(params.getPostId(), relativePath);
            return "File uploaded successfully to: " + dest.getPath();
        } catch (Exception e) {
            e.printStackTrace();
            return "File upload failed: " + e.getMessage();
        }
    }

    private void saveImageToDatabase(Integer postId, String relativePath) {
        PostImageRequestDTO imgParams = new PostImageRequestDTO();
        imgParams.setPostId(postId);
        imgParams.setImagePath(relativePath);
        postMapper.savePostImage(imgParams);
    }


    public List<PostResponseDTO> getPost(){
        System.out.println("debug >>>> service list()" + postMapper); 
        List<PostResponseDTO> lst = postMapper.getPost();
        System.out.println("lst : " +lst);
        return postMapper.getPost();
    }
}
