package com.kdt_final.back.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    // @Override
    // public void addCorsMappings(CorsRegistry registry) {
    //     registry.addMapping("/**")
    //             .allowedOrigins("http://localhost:3000")
    //             .allowedMethods("*")
    //             .allowCredentials(true);
    // }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String absolutePath = System.getProperty("user.dir") + "/uploads/images/profileImages";
        registry.addResourceHandler("/profileImages/**") // --1
                .addResourceLocations("file:///"+absolutePath+"/"); //--2
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://211.188.56.70:3000") // 허용할 출처
                .allowedMethods("*")
                .allowCredentials(true); // 쿠키 공유를 원하면 true
    }
}