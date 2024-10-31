//package com.kdt_final.back.ShopTest;
//
//import com.kdt_final.back.Shop.ctrl.MileageController;
//import com.kdt_final.back.Shop.domain.Mileage;
//import com.kdt_final.back.Shop.service.MileageService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.http.ResponseEntity;
//
//import static org.mockito.Mockito.when;
//
//public class MileageControllerTest {
//
//    @InjectMocks
//    private MileageController mileageController;
//
//    @Mock
//    private MileageService mileageService;
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    public void testGetMileage() {
//        // Given
//        int userId = 1;
//        // Mileage 객체를 모의하여 반환값 설정
//        when(mileageService.getMileage(userId)).thenReturn(new Mileage());
//
//        // When
//        ResponseEntity<?> response = mileageController.getMileage(userId);
//
//        // Then
//        // Assertions to check response status and content
//        assertEquals(200, response.getStatusCodeValue());
//    }
//}
