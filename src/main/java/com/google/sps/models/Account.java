package com.google.sps.models;

import com.google.appengine.api.datastore.Entity;
import com.google.sps.constants.AccountRole;
import com.google.sps.utils.Validation.ValidationErrors;
import com.google.sps.utils.Validation.ValidationResponse;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.servlet.http.HttpServletRequest;

@Builder
@Setter
@Getter
public class Account implements IModel {
    private long id;
    private String firebaseUid;
    private String name;
    private String email;
    private String imageUrl;
    private String institute;
    private AccountRole role;
    private boolean isVerified;

    @Builder.Default
    private long created = System.currentTimeMillis();
    @Builder.Default
    private long updated = System.currentTimeMillis();

    @Override
    public ValidationResponse validate() {
        ValidationResponse.Builder validationResponseBuilder = ValidationResponse.builder();
        validationResponseBuilder.status(ValidationErrors.STATUS_OK);
        validationResponseBuilder.message(ValidationErrors.MESSAGE_OK);

        // TODO: all kinds of validators

        return validationResponseBuilder.build();
    }

    @Override
    public Entity getAsEntity() {
        Entity accountEntity = new Entity(Keys.KIND);

        accountEntity.setProperty(Keys.NAME, this.name);
        accountEntity.setProperty(Keys.EMAIL, this.email);
        accountEntity.setProperty(Keys.FIREBASE_UID, this.firebaseUid);
        accountEntity.setProperty(Keys.IMAGE_URL, this.imageUrl);
        accountEntity.setProperty(Keys.INSTITUTE, this.institute);
        accountEntity.setProperty(Keys.ROLE, this.role);
        accountEntity.setProperty(Keys.IS_VERIFIED, this.isVerified);
        accountEntity.setProperty(Keys.CREATED, this.created);
        accountEntity.setProperty(Keys.UPDATED, this.updated);

        return accountEntity;
    }

    @Override
    public IModel createFromEntity(Entity entity) {
        return Account.builder()
                .id(entity.getKey().getId())
                .firebaseUid((String) entity.getProperty(Keys.FIREBASE_UID))
                .name((String) entity.getProperty(Keys.NAME))
                .email((String) entity.getProperty(Keys.EMAIL))
                .imageUrl((String) entity.getProperty(Keys.IMAGE_URL))
                .institute((String) entity.getProperty(Keys.INSTITUTE))
                .role(AccountRole.valueOfLabel((String) entity.getProperty(Keys.ROLE)))
                .isVerified((boolean) entity.getProperty(Keys.IS_VERIFIED))
                .build();
    }

    @Override
    public IModel createFromRequest(HttpServletRequest request) {
        return null;
    }

    public static class Keys {
        public static String KIND = "account";
        public static String NAME = "name";
        public static String EMAIL = "email";
        public static String FIREBASE_UID = "firebase_uid";
        public static String IMAGE_URL = "image_url";
        public static String INSTITUTE = "institute";
        public static String ROLE = "role";
        public static String IS_VERIFIED = "is_verified";
        public static String CREATED = "created";
        public static String UPDATED = "updated";
    }
}
