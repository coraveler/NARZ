// package com.kdt_final.back.ShopTest;

// import com.kdt_final.back.shop.ctrl.MileageController;
// import com.kdt_final.back.shop.domain.Mileage;
// import com.kdt_final.back.shop.service.MileageService;
// import org.junit.jupiter.api.Test;
// import org.mockito.Mockito;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.http.MediaType;
// import org.springframework.test.web.servlet.MockMvc;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// import static org.mockito.ArgumentMatchers.any;

// @WebMvcTest(MileageController.class)
// class MileageControllerTest {

//     @Autowired
//     private MockMvc mockMvc;

//     @MockBean
//     private MileageService mileageService;

//     @Test
//     void testAddMileage() throws Exception {
//         Mileage mileage = new Mileage();
//         mileage.setUserId(123);
//         mileage.setMileage(-1000); // 포인트 차감
//         mileage.setChangeHistory("구매: 닉네임 변경");

//         // 서비스 메서드가 호출될 때 아무 동작도 수행하지 않도록 설정
//         Mockito.doNothing().when(mileageService).addMileage(any(Mileage.class));

//         mockMvc.perform(post("/api/mileage/")
//                         .contentType(MediaType.APPLICATION_JSON)
//                         .content("{\"userId\": 123, \"mileage\": -1000, \"changeHistory\": \"구매: 닉네임 변경\"}"))
//                 .andExpect(status().isOk());
//     }

//     @Test
//     void testGetMileageHistory() throws Exception {
//         int userId = 123;

//         mockMvc.perform(get("/api/mileage/history/" + userId))
//                 .andExpect(status().isOk())
//                 .andExpect(content().contentType(MediaType.APPLICATION_JSON));
//     }
// }
