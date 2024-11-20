package com.kdt_final.back.user.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kdt_final.back.shop.dao.MileageMapper;
import com.kdt_final.back.shop.domain.MileageHistory;
import com.kdt_final.back.user.dao.user.UserMapper;
import com.kdt_final.back.user.dao.user.UserRepository;
import com.kdt_final.back.user.domain.User;
import com.kdt_final.back.user.dto.LoginResponseDTO;
import com.kdt_final.back.user.dto.UpdateResponseDTO;
import com.kdt_final.back.user.dto.UserDTO;

import jakarta.xml.bind.DatatypeConverter;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final String profileImagesFolder = "/profileImages";
    private final String profileImagesPath = System.getProperty("user.dir") + "/uploads/images" + profileImagesFolder;
    private final String defaultImageName = "default.png";
    private final UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;
     @Autowired
    private MileageMapper mileageMapper;

    public List<UserDTO.UserResponseDTO> findUserAll() {
        List<User> userAll = userRepository.findUserAll();

        List<UserDTO.UserResponseDTO> userResponseDTOS = new ArrayList<>();

        for (User user : userAll) {
            UserDTO.UserResponseDTO userResponseDTO = UserDTO.UserResponseDTO.builder()
                    .userId(user.getUserId())
                    .loginId(user.getLoginId())
                    .userName(user.getUserName())
                    .email(user.getEmail())
                    .userNickname(user.getUserNickname())
                    .build();
            userResponseDTOS.add(userResponseDTO);
        }

        return userResponseDTOS;
    }

    // 회원가입
    public Boolean creatUser(UserDTO.UserRequestDTO userRequestDTO) {

        if (userRequestDTO.getUserNickname().equals((checkDuplicateUserNickName(userRequestDTO.getUserNickname())))) {
            return false;
        } else if (userRequestDTO.getLoginId().equals(checkDuplicateLoginId(userRequestDTO.getLoginId()))) {
            return false;
        } else if (!userRequestDTO.getLoginId().matches("^[a-zA-Z0-9]{5,}$")) {
            return false;
        } else if (!userRequestDTO.getPassword().matches("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")) {
            return false;
        } else if (!userRequestDTO.getPassword().equals(userRequestDTO.getPasswordConfirm())) {
            return false;

        } else if (!userRequestDTO.getUserName().matches("^[가-힣]+$")) {
            return false;
        } else if (userRequestDTO.getPhoneNum().matches("/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/")) {
            return false;
        } else if (!userRequestDTO.getEmail().matches("^[\\w-\\.]+@[\\w-]+\\.[a-zA-Z]{2,}$")) {
            return false;
        } else {
            User user = new User();
            user.setLoginId(userRequestDTO.getLoginId());
            user.setUserName(userRequestDTO.getUserName());
            user.setPassword(userRequestDTO.getPassword());
            user.setEmail(userRequestDTO.getEmail());
            user.setUserNickname(userRequestDTO.getUserNickname());
            user.setPhoneNum(userRequestDTO.getPhoneNum());
            user.setBirthday(userRequestDTO.getBirthday());
            user.setProfileImage("default.png");

            userRepository.createUser(user);

            return true;
        }

    }

    // 닉네임 중복체크
    public Boolean checkDuplicateUserNickName(String userNickname) {
        List<User> allByUserNickname = userRepository.findAllByUserNickname(userNickname);

        if (allByUserNickname == null || allByUserNickname.isEmpty()) {
            return true;
        }
        return false;

    }

    // 아이디 중복체크
    public Boolean checkDuplicateLoginId(String loginId) {
        List<User> allByLoginId = userRepository.findAllByLoginId(loginId);
        if (allByLoginId == null || allByLoginId.isEmpty()) {
            return true;
        }
        return false;
    }

    // 이메일 중복체크
    public Boolean checkDuplicateEmail(String email) {
        List<User> allByEmail = userRepository.findAllByUserEmail(email);
        if (allByEmail == null || allByEmail.isEmpty()) {
            return true;
        }
        return false;
    }

    // 로그인
    public LoginResponseDTO login(UserDTO.UserRequestDTO userRequestDTO) {

        String loginId = userRequestDTO.getLoginId();
        String password = userRequestDTO.getPassword();
        User user = userRepository.findByLoginIdAndPassword(loginId, password);

        if (user == null) {
            return LoginResponseDTO
                    .builder()
                    .isLogin(false)
                    .build();
        } else {
            attendanceMileage(loginId);
            updateLastLogin(loginId);
            UserDTO.UserResponseDTO userResponseDTO = UserDTO.UserResponseDTO.builder()
                    .userId(user.getUserId())
                    .loginId(user.getLoginId())
                    .userNickname(user.getUserNickname())
                    .email(user.getEmail())
                    .phoneNum(user.getPhoneNum())
                    .userName(user.getUserName())
                    .birthday(user.getBirthday())
                    .profileImage(user.getProfileImage())
                    .build();
            LoginResponseDTO loginResponseDTO = LoginResponseDTO.builder()
                    .isLogin(true)
                    .userResponseDTO(userResponseDTO)
                    .build();
            return loginResponseDTO;
        }
    }

    // 회원정보수정
    public UpdateResponseDTO updateUser(UserDTO.UserRequestDTO userDTO) {

        if (!userDTO.getEmail().matches("^[\\w-\\.]+@[\\w-]+\\.[a-zA-Z]{2,}$")) {
            return UpdateResponseDTO
                    .builder()
                    .isUpdate(false)
                    .build();
        } else if (!userDTO.getPhoneNum().matches("^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$")) {
            return UpdateResponseDTO
                    .builder()
                    .isUpdate(false)
                    .build();
        } else {
            User user = new User();

            String result = saveProfileImage(userDTO.getProfileImage(), userDTO.getLoginId());

            user.setUserId(userDTO.getUserId());
            user.setLoginId(userDTO.getLoginId());
            user.setUserName(userDTO.getUserName());
            user.setPassword(userDTO.getPassword());
            user.setEmail(userDTO.getEmail());
            user.setUserNickname(userDTO.getUserNickname());
            user.setPhoneNum(userDTO.getPhoneNum());
            user.setBirthday(userDTO.getBirthday());
            user.setProfileImage(result);

            userRepository.updateUser(user);

            UserDTO.UserResponseDTO userResponseDTO = UserDTO.UserResponseDTO.builder()
                    .userId(user.getUserId())
                    .loginId(user.getLoginId())
                    .userNickname(user.getUserNickname())
                    .email(user.getEmail())
                    .phoneNum(user.getPhoneNum())
                    .userName(user.getUserName())
                    .birthday(user.getBirthday())
                    .profileImage(user.getProfileImage())
                    .build();
            UpdateResponseDTO updateResponseDTO = UpdateResponseDTO.builder()
                    .isUpdate(true)
                    .userResponseDTO(userResponseDTO)
                    .build();

            return updateResponseDTO;

        }
    }

    public UserDTO.UserResponseDTO getUserInfo(Integer userId) {
        User user = userRepository.getUserInfo(userId); // User 객체를 가져옴
        // if (user == null) {
        // throw new UserNotFoundException("User not found");
        // }
        return UserDTO.UserResponseDTO.builder()
                .userId(user.getUserId())
                .loginId(user.getLoginId())
                .userName(user.getUserName())
                .userNickname(user.getUserNickname())
                .userColor(user.getUserColor())
                .achievement(user.getAchievement() != null ? user.getAchievement() : "여행 초보자")
                .profileImage(user.getProfileImage())
                .build();
    }

    // 비빌번호 재설정 아이디/메일로 회원 유무 확인
    public Boolean checkUser(UserDTO.UserRequestDTO userDTO) {

        String loginId = userDTO.getLoginId();
        String email = userDTO.getEmail();
        User loginResult = userRepository.findUserByLoginIdAndEmail(loginId, email);

        if (loginResult == null) {
            return false;
        } else
            return true;
    }

    // 인증코드 확인
    public Boolean checkUserCode(UserDTO.UserRequestDTO userDTO) {
        String loginId = userDTO.getLoginId();
        String userCode = userDTO.getUserCode();

        User user = userRepository.findCodeByLoginId(loginId, userCode);

        if (userCode.equals(user.getUserCode())) {
            return true;
        } else
            return false;
    }

    // 비밀번호재설정
    public UpdateResponseDTO updatePassword(UserDTO.UserRequestDTO userDTO) {

        if (!userDTO.getPassword().matches("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")) {
            return UpdateResponseDTO
                    .builder()
                    .isUpdate(false)
                    .build();
        } else if (!userDTO.getPasswordConfirm().equals(userDTO.getPassword())) {
            return UpdateResponseDTO
                    .builder()
                    .isUpdate(false)
                    .build();
        } else {

            String loginId = userDTO.getLoginId();
            String password = userDTO.getPassword();

            Integer updatePwResult = userRepository.updatePassword(loginId, password);

            if (updatePwResult == 1) {
                deleteCode(loginId);// DB에 저장된 인증코드 삭제

                return UpdateResponseDTO
                        .builder()
                        .isUpdate(true)
                        .build();

            } else
                return UpdateResponseDTO
                        .builder()
                        .isUpdate(false)
                        .build();
        }

    }

    // DB에 저장된 인증번호 삭제
    public void deleteCode(String loginId) {

        userRepository.deleteCode(loginId);

    }

    // 유저 닉네임 색상 변경
    public void changeNicknameColor(UserDTO.UserRequestDTO userId) {
        userRepository.changeNicknameColor(userId);
    }

    // 유저 닉네임 색상 가져오기
    public String fetchNicknameColor(int userId) {
        return userRepository.fetchNicknameColor(userId);
    }

    // 칭호

    public String saveProfileImage(String base64, String loginId) {
        if (base64.contains(profileImagesFolder))
            return base64.split(profileImagesFolder + "/")[1];

        String data = base64.split(";base64,")[1];
        String fileFormat = base64.split(";base64,")[0].split("data:image/")[1];

        byte[] imageBytes = DatatypeConverter.parseBase64Binary(data);

        String fileName = UUID.randomUUID().toString() + "." + fileFormat;
        File file = new File(profileImagesPath, fileName);

        try {
            BufferedImage bufImg = ImageIO.read(new ByteArrayInputStream(imageBytes));
            ImageIO.write(bufImg, fileFormat, file);
            if (!base64.contains(defaultImageName))
                deleteOrgProfileImage(loginId);
            userRepository.saveFileName(fileName);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return fileName;
    }

    public void deleteOrgProfileImage(String loginId) throws IOException {
        User user = userRepository.findByLoginId(loginId);
        if (user.getProfileImage().contains(defaultImageName))
            return;
        Path path = Paths.get(profileImagesPath + "/" + user.getProfileImage());
        Files.deleteIfExists(path);
    }

    public boolean updateUserAchievement(int userId, String badgeName) {
        try {
            int updatedRows = userRepository.updateAchievementByUserId(userId, badgeName);
            return updatedRows > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public void updateLastLogin(String loginId) {
        userMapper.updateLastLogin(loginId);
    }

    public void attendanceMileage(String loginId) {
        User params = userRepository.findByLoginId(loginId);
        System.out.println(params.getLastActiveDate());

        String lastActiveDate = params.getLastActiveDate();

        // 현재 날짜 가져오기
        LocalDate today = LocalDate.now();

        // lastActiveDate 문자열을 LocalDate로 변환하기 위한 포맷 정의
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // 문자열을 LocalDateTime으로 변환하고, 날짜 부분만 추출
        LocalDate lastActiveDay = LocalDate.parse(lastActiveDate, formatter);
        System.out.println("lastActiveDay"+lastActiveDay);
        System.out.println("today"+today);
        // 오늘 날짜와 lastActiveDate의 날짜 비교
        if (!today.isEqual(lastActiveDay)) {
            MileageHistory mileage = new MileageHistory();
            mileage.setUserId(params.getUserId());
            mileage.setMileagePoints(25);
            mileage.setDescription("출석체크");
            System.out.println("EEEEEEEEEEEEEQEQEQWEQWE");
            System.out.println(mileage);
            mileageMapper.insertMileageHistory(mileage);
        }
    }
}
