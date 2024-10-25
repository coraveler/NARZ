package com.kdt_final.back.shop.service;

import com.kdt_final.back.shop.dao.MileageHistoryMapper;
import com.kdt_final.back.shop.domain.MileageHistory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class MileageHistoryServiceTest {

    @Mock
    private MileageHistoryMapper mileageHistoryMapper;

    @InjectMocks
    private MileageHistoryService mileageHistoryService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Mockito 초기화
    }

    @Test
    void testAddHistory() {
        MileageHistory history = new MileageHistory("user123", 100, "포인트 적립");
        mileageHistoryService.addHistory(history);
        verify(mileageHistoryMapper, times(1)).insertMileageHistory(history);
    }

    @Test
    void testGetHistoryByUser() {
        List<MileageHistory> mockHistories = new ArrayList<>();
        mockHistories.add(new MileageHistory("user123", 100, "포인트 적립"));
        
        when(mileageHistoryMapper.findByUserId("user123")).thenReturn(mockHistories);

        List<MileageHistory> result = mileageHistoryService.getHistoryByUser("user123");
        assertEquals(1, result.size());
        assertEquals("포인트 적립", result.get(0).getDescription());
    }

    @Test
    void testGetAllHistories() {
        List<MileageHistory> mockHistories = new ArrayList<>();
        mockHistories.add(new MileageHistory("user123", 100, "포인트 적립"));
        
        when(mileageHistoryMapper.getAllHistories()).thenReturn(mockHistories);

        List<MileageHistory> result = mileageHistoryService.getAllHistories();
        assertEquals(1, result.size());
        assertEquals("user123", result.get(0).getUserId());
    }
}
