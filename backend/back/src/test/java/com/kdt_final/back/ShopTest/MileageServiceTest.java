//package com.kdt_final.back.ShopTest;
//
//import com.kdt_final.back.Shop.dao.MileageMapper;
//import com.kdt_final.back.Shop.domain.Mileage;
//import com.kdt_final.back.Shop.service.MileageService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.mockito.Mockito.when;
//
//public class MileageServiceTest {
//
//    @InjectMocks
//    private MileageService mileageService;
//
//    @Mock
//    private MileageMapper mileageMapper;
//
//    private Mileage mileage;
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//        mileage = new Mileage();
//        mileage.setMileageId(1);
//        mileage.setUserId(1);
//        mileage.setMileage(100);
//    }
//
//    @Test
//    public void testAddMileage() {
//        // Given
//        when(mileageMapper.insertMileage(mileage)).thenReturn(1);
//
//        // When
//        int result = mileageService.addMileage(mileage);
//
//        // Then
//        assertEquals(1, result);
//    }
//
//    @Test
//    public void testGetMileage() {
//        // Given
//        when(mileageMapper.getMileage(1)).thenReturn(mileage);
//
//        // When
//        Mileage result = mileageService.getMileage(1);
//
//        // Then
//        assertEquals(mileage.getMileage(), result.getMileage());
//    }
//}
