package com.kuhak.controller.dto;

import java.time.LocalDateTime;

/**
 * Created by snigdha on 12-04-2021.
 */
public class AppDto {
    String appExtId;
    String userExtId;


    public String getAppExtId() {
        return appExtId;
    }

    public void setAppExtId(String appExtId) {
        this.appExtId = appExtId;
    }

    public String getUserExtId() {
        return userExtId;
    }

    public void setUserExtId(String userExtId) {
        this.userExtId = userExtId;
    }
}
