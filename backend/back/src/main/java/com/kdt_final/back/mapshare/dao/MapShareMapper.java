package com.kdt_final.back.mapshare.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kdt_final.back.mapshare.domain.MapLikeRequestDTO;
import com.kdt_final.back.mapshare.domain.MapShareRequestDTO;
import com.kdt_final.back.mapshare.domain.MapShareResponseDTO;

@Mapper
public interface MapShareMapper {

    public void saveMapShareImg(MapShareRequestDTO params);

    public List<MapShareResponseDTO> getMapShareImg();

    public void deleteMapShareImg(int mapId);

    public void addMapLike(MapLikeRequestDTO params);

    public boolean checkMapLike(MapLikeRequestDTO params);

    public void deleteMapLike(MapLikeRequestDTO params);

    public Integer fetchMapLikeTotal(Integer mapId);

    public List<MapShareResponseDTO> fetchSelfMapList(int mapId);
}
