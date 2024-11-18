// package com.kdt_final.back.ShopTest;

// import com.kdt_final.back.shop.dao.MileageMapper;
// import com.kdt_final.back.shop.domain.Mileage;
// import com.kdt_final.back.shop.domain.MileageHistory;
// import com.kdt_final.back.shop.service.MileageService;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.MockitoAnnotations;

// import java.util.ArrayList;
// import java.util.List;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.mockito.Mockito.*;

// class MileageServiceTest {

//     @Mock
//     private MileageMapper mileageMapper;

//     @InjectMocks
//     private MileageService mileageService;

//     @BeforeEach
//     void setUp() {
//         MockitoAnnotations.openMocks(this);
//     }

//     @Test
//     void testAddMileage() {
//         // Given
//         Mileage mileage = new Mileage();
//         mileage.setUserId(123);
//         mileage.setMileage(-1000); // 구매로 인한 포인트 차감
//         mileage.setChangeHistory("구매: 닉네임 변경");

//         // When
//         mileageService.addMileage(mileage);

//         // Then
//         verify(mileageMapper, times(1)).insertMileage(mileage);
//     }

//     @Test
//     void testGetMileageHistory() {
//         // Given
//         int userId = 123;
//         List<MileageHistory> expectedHistory = new ArrayList<>();
//         when(mileageMapper.getMileageHistoryByUserId(userId)).thenReturn(expectedHistory);

//         // When
//         List<MileageHistory> actualHistory = mileageService.getMileageHistory(userId);

//         // Then
//         assertEquals(expectedHistory, actualHistory);
//         verify(mileageMapper, times(1)).getMileageHistoryByUserId(userId);
//     }
// }
