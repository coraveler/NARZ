package com.kdt_final.back.shop.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.kdt_final.back.shop.domain.MileageHistory;

@Mapper
public interface MileageHistoryMapper {
    
    @Select("SELECT * FROM mileage_history WHERE mileage_id = #{mileageId}")
    MileageHistory findById(Long mileageId);

    @Select("SELECT * FROM mileage_history WHERE user_id = #{userId}")
    List<MileageHistory> findByUserId(String userId);

    @Insert("INSERT INTO mileage_history (user_id, mileage_points, description, created_at) " +
        "VALUES (#{userId}, #{mileagePoints}, #{description}, CURRENT_TIMESTAMP)")
        @Options(useGeneratedKeys = true, keyProperty = "mileageId")
        void insertMileageHistory(MileageHistory mileageHistory);


    @Update("UPDATE mileage_history SET mileage_points = #{mileagePoints}, description = #{description}, " +
            "change_date = #{changeDate} WHERE mileage_id = #{mileageId}")
    void updateMileageHistory(MileageHistory mileageHistory);

    @Delete("DELETE FROM mileage_history WHERE mileage_id = #{mileageId}")
    void deleteMileageHistory(Long mileageId);

    // 매퍼 XML에서 정의한 메소드와 일치
    List<MileageHistory> getAllHistories(); // ID가 getAllHistories인 메소드 추가
}
