include $(CLEAR_VARS)
LOCAL_MODULE := sodium
LOCAL_SRC_FILES := /usr/local/lib/libsodium.a
LOCAL_C_INCLUDES := /usr/local/include
include $(PREBUILT_STATIC_LIBRARY)

include $(CLEAR_VARS)
LOCAL_MODULE := gmp
LOCAL_SRC_FILES := /usr/local/lib/libgmp.a
LOCAL_C_INCLUDES := /usr/local/include
include $(PREBUILT_STATIC_LIBRARY)


include $(CLEAR_VARS)
LOCAL_PATH := $(call my-dir)

LOCAL_C_INCLUDES := /usr/local/include

LOCAL_STATIC_LIBRARIES := gmp sodium

LOCAL_SRC_FILES += $(HOME)/Downloads/StockNotifier-Frontend-master/android/app/src/main/jni/com_stock_client_login_ClientBridge.c
LOCAL_SRC_FILES += $(HOME)/Downloads/StockNotifier-Frontend-master/android/app/src/main/jni//client_login.c
LOCAL_MODULE := login_client

include $(BUILD_SHARED_LIBRARY)
