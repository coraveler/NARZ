package com.kdt_final.back.post.service;

import java.io.File;
import java.util.List;
import java.util.UUID;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.jpa.domain.JpaSort.Path;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kdt_final.back.post.dao.PostMapper;
import com.kdt_final.back.post.domain.PostRequestDTO;
import com.kdt_final.back.post.domain.PostResponseDTO;
import com.kdt_final.back.post.domain.postBookMark.PostBookMarkRequestDTO;
import com.kdt_final.back.post.domain.postImage.PostImageRequestDTO;
import com.kdt_final.back.post.domain.postImage.PostImageResponseDTO;
import com.kdt_final.back.post.domain.postLike.PostLikeRequestDTO;

// import io.swagger.v3.oas.models.Paths;

@Service
public class PostService {

    
    @Autowired
    private PostMapper postMapper;

    public Integer save(PostRequestDTO params, MultipartFile[] images) {
        System.out.println("Debug >>>> service save() - PostMapper: " + postMapper);
        
        // 이미지 업로드 처리
        if (images != null && images.length > 0) {

            uploadImages(images, params, "save");
        } else {
            System.out.println("No images uploaded.");
        }
        return params.getPostId();
    }

    public Integer edit(PostRequestDTO params, MultipartFile[] images) {
        System.out.println("Debug >>>> service save() - PostMapper: " + postMapper);
        deleteImageFile(params.getPostId());
        postMapper.deletePostImage(params);

        // 이미지 업로드 처리
        if (images != null && images.length > 0) {

            uploadImages(images, params, "edit");
        } else {
            System.out.println("No images uploaded.");
        }
        return params.getPostId();
    }

    private void uploadImages(MultipartFile[] images, PostRequestDTO params, String method) {
        String uploadDir = getUploadDir();
        File userDir = new File(uploadDir);
        userDir.mkdirs(); // 디렉토리가 없으면 생성

        for (int i = 0; i < images.length; i++) {
            MultipartFile image = images[i];
            String result = savePostImage(userDir, image, params, i + 1, method);
            System.out.println(result);
        }
    }

    private String getUploadDir() {
        String baseDir = System.getProperty("user.dir");
        return baseDir + "/uploads/images/post/";
    }

    private String savePostImage(File userDir, MultipartFile image, PostRequestDTO params, int num, String method) {
        try {
            String randomFileName = UUID.randomUUID().toString() + ".png";
            File dest = new File(userDir, randomFileName);
            image.transferTo(dest);

            String relativePath = "uploads/images/post/" + randomFileName;
            if (num == 1) {
                params.setHeaderImg(relativePath); // 첫 번째 이미지를 헤더 이미지로 설정
                if(method.equals("save")){
                    // 데이터베이스에 포스트 저장
                    postMapper.saveRow(params);
                }else{
                    postMapper.editRow(params);
                }
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
    
    String baseUrl = "http://localhost:7777/post/";

    public List<PostResponseDTO> getAllPost(String local) {
        System.out.println("debug >>>> service list()" + postMapper); 
        List<PostResponseDTO> lst;
        if (local.equals("all")) {
            lst = postMapper.getAllPost();
        } else {
            lst = postMapper.getPost(local);
        }
        System.out.println("lst : " + lst);
    
        for (int i = 0; i < lst.size(); i++) {
            String imgPath = lst.get(i).getHeaderImg();
            if (imgPath != null) {
                // imgPath에 baseUrl을 추가하여 전체 경로를 생성
                lst.get(i).setHeaderImg(baseUrl + imgPath);
            }
    
            // 각 포스트의 좋아요 수를 추가
            int likeCount = postMapper.countLike(lst.get(i).getPostId()); // 포스트 ID를 사용하여 좋아요 수 조회
            lst.get(i).setLikeCount(likeCount); // 좋아요 수 설정
        }
    
        return lst;
    }
    // 'uploads/images/post/5fcecd64-8ac5-4418-a27b-e305da5cb1dd.png'
    public void deleteImageFile(Integer postId){
        List<PostImageResponseDTO> lst = postMapper.getPostImages(postId);

        for (PostImageResponseDTO image : lst) {
            String imagePath = image.getImagePath();
            System.out.println(imagePath);
            // 여기서 imagePath를 사용하여 실제 파일 삭제 로직을 구현

                // 파일 삭제 로직 구현
            try {
                // 실제 파일 경로를 생성
                Path path = Paths.get(imagePath);
                Files.deleteIfExists(path); // 파일이 존재하면 삭제
                System.out.println("삭제 성공: " + imagePath);
            } catch (Exception e) {
                System.out.println("파일 삭제 실패: " + imagePath);
                e.printStackTrace(); // 예외 발생 시 스택 트레이스 출력
            }
        }
        
    }

    public void delete(Integer postId){
        deleteImageFile(postId);
        postMapper.delete(postId);
    }

    public PostResponseDTO viewPost(int postId){
        System.out.println("debug >>>> service list()" + postMapper); 
        return postMapper.viewPost(postId);
    }

    public List<PostImageResponseDTO> getPostImages(int postId){    
        List<PostImageResponseDTO> lst = postMapper.getPostImages(postId);
        System.out.println("lst : " +lst);
        for(int i=0; i<lst.size(); i++){
            String imgPath = lst.get(i).getImagePath();
            if (imgPath != null) {
                // imgPath에 baseUrl을 추가하여 전체 경로를 생성
                lst.get(i).setImagePath(baseUrl + imgPath);
            }
        }
        return lst;
    }

    public void likeSave(PostLikeRequestDTO params){
        postMapper.likeSave(params);
    }

    public void likeDelete(PostLikeRequestDTO params){
        postMapper.likeDelete(params);
    }

    public Boolean likeCheck(PostLikeRequestDTO params){
        Integer result = postMapper.likeCheck(params);
        return result != null;
    }

    public Integer countLike(Integer postId){
        return postMapper.countLike(postId);
    }

    public void bookMarkSave(PostBookMarkRequestDTO params){
        postMapper.bookMarkSave(params);
    }

    public void bookMarkDelete(PostBookMarkRequestDTO params){
        postMapper.bookMarkDelete(params);
    }

    public Boolean bookMarkCheck(PostBookMarkRequestDTO params){
        Integer result = postMapper.bookMarkCheck(params);
        return result != null;
    }

    public List<PostResponseDTO> getBoardPost(PostRequestDTO params, String board) {
        List<PostResponseDTO> lst ;
        switch (board) {
            case "bookmark":
                // System.err.println("ASDASDASDASDASDASD");
                lst = getBookMark(params);
                break;
            case "travelog":
                lst = getTravelLog(params);                
                break;
            default:
                lst = null;
                break;
        }
        return lst;
    }


    public List<PostResponseDTO> getBookMark(PostRequestDTO params) {
        System.out.println("debug >>>> service list()" + postMapper); 
        List<PostResponseDTO> lst ;
        if(params.getLocal().equals("all")){
            lst = postMapper.getAllBookMark(params.getUserId());
        }else{
            lst = postMapper.getBookMark(params);
        }
        
        System.out.println("lst : " + lst);
    
        for (int i = 0; i < lst.size(); i++) {
            String imgPath = lst.get(i).getHeaderImg();
            if (imgPath != null) {
                // imgPath에 baseUrl을 추가하여 전체 경로를 생성
                lst.get(i).setHeaderImg(baseUrl + imgPath);
            }
             // 각 포스트의 좋아요 수를 추가
             int likeCount = postMapper.countLike(lst.get(i).getPostId()); // 포스트 ID를 사용하여 좋아요 수 조회
             lst.get(i).setLikeCount(likeCount); // 좋아요 수 설정
        }
    
        return lst;
    }


    public List<PostResponseDTO> getTravelLog(PostRequestDTO params) {
        System.out.println("debug >>>> service list()" + postMapper); 
        List<PostResponseDTO> lst ;
        if(params.getLocal().equals("all")){
            lst = postMapper.getAllTravelog(params.getUserId());
        }else{
            lst = postMapper.getTravelog(params);
        }
        
        System.out.println("lst : " + lst);
    
        for (int i = 0; i < lst.size(); i++) {
            String imgPath = lst.get(i).getHeaderImg();
            if (imgPath != null) {
                // imgPath에 baseUrl을 추가하여 전체 경로를 생성
                lst.get(i).setHeaderImg(baseUrl + imgPath);
            }
             // 각 포스트의 좋아요 수를 추가
             int likeCount = postMapper.countLike(lst.get(i).getPostId()); // 포스트 ID를 사용하여 좋아요 수 조회
             lst.get(i).setLikeCount(likeCount); // 좋아요 수 설정
        }
    
        return lst;
    }
}