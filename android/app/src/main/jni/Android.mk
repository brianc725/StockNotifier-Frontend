include $(CLEAR_VARS)
LOCAL_MODULE := sodium
ifeq ($(TARGET_ARCH_ABI),arm64-v8a)
	LOCAL_SRC_FILES := $(PROJECT_ROOT)/android/app/src/main/jni/clibs/armv8/libsodim.so
else
	ifeq ($(TARGET_ARCH_ABI),armeabi-v7a)
		LOCAL_SRC_FILES := $(PROJECT_ROOT)/android/app/src/main/jni/clibs/armv7/libsodium.so
	else
		ifeq ($(TARGET_ARCH_ABI),x86)
			LOCAL_SRC_FILES := $(PROJECT_ROOT)/android/app/src/main/jni/clibs/x86/libsodium.so
		else
			LOCAL_SRC_FILES := $(PROJECT_ROOT)/android/app/src/main/jni/clibs/x86_64/libsodium.so
		endif
	endif
endif
ifeq ($(TARGET_ARCH_ABI),arm64-v8a)
	LOCAL_C_INCLUDES := $(PROJECT_ROOT)/android/app/src/main/jni/cincludes/armv8/sodium.h
else
	ifeq ($(TARGET_ARCH_ABI),armeabi-v7a)
		LOCAL_C_INCLUDES := $(PROJECT_ROOT)/android/app/src/main/jni/cincludes/armv7/sodium.h
	else
		ifeq ($(TARGET_ARCH_ABI),x86)
			LOCAL_C_INCLUDES := $(PROJECT_ROOT)/android/app/src/main/jni/cincludes/x86/sodium.h
		else
			LOCAL_C_INCLUDES := $(PROJECT_ROOT)/android/app/src/main/jni/cincludes/x86_64/sodium.h
		endif
	endif
endif

include $(PREBUILT_SHARED_LIBRARY)

include $(CLEAR_VARS)
LOCAL_MODULE := gmp
ifeq ($(TARGET_ARCH_ABI),arm64-v8a)
	LOCAL_SRC_FILES := $(PROJECT_ROOT)/android/app/src/main/jni/clibs/armv8/libgmp.so
else
	ifeq ($(TARGET_ARCH_ABI),armeabi-v7a)
		LOCAL_SRC_FILES := $(PROJECT_ROOT)/android/app/src/main/jni/clibs/armv7/libgmp.so
	else
		ifeq ($(TARGET_ARCH_ABI),x86)
			LOCAL_SRC_FILES := $(PROJECT_ROOT)/android/app/src/main/jni/clibs/x86/libgmp.so
		else
			LOCAL_SRC_FILES := $(PROJECT_ROOT)/android/app/src/main/jni/clibs/x86_64/libgmp.so
		endif
	endif
endif
ifeq ($(TARGET_ARCH_ABI),arm64-v8a)
	LOCAL_C_INCLUDES := $(PROJECT_ROOT)/android/app/src/main/jni/cincludes/armv8/gmp.h
else
	ifeq ($(TARGET_ARCH_ABI),armeabi-v7a)
		LOCAL_C_INCLUDES := $(PROJECT_ROOT)/android/app/src/main/jni/cincludes/armv7/gmp.h
	else
		ifeq ($(TARGET_ARCH_ABI),x86)
			LOCAL_C_INCLUDES := $(PROJECT_ROOT)/android/app/src/main/jni/cincludes/x86/gmp.h
		else
			LOCAL_C_INCLUDES := $(PROJECT_ROOT)/android/app/src/main/jni/cincludes/x86_64/gmp.h
		endif
	endif
endif
include $(PREBUILT_SHARED_LIBRARY)


include $(CLEAR_VARS)
LOCAL_PATH := $(call my-dir)

$(info $(LOCAL_PATH))

ifeq ($(TARGET_ARCH_ABI),arm64-v8a)
	LOCAL_C_INCLUDES := $(PROJECT_ROOT)/android/app/src/main/jni/cincludes/armv8/
else
	ifeq ($(TARGET_ARCH_ABI),armeabi-v7a)
		LOCAL_C_INCLUDES := $(PROJECT_ROOT)/android/app/src/main/jni/cincludes/armv7/
	else
		ifeq ($(TARGET_ARCH_ABI),x86)
			LOCAL_C_INCLUDES := $(PROJECT_ROOT)/android/app/src/main/jni/cincludes/x86/
		else
			LOCAL_C_INCLUDES := $(PROJECT_ROOT)/android/app/src/main/jni/cincludes/x86_64/
		endif
	endif
endif

$(info $(LOCAL_C_INCLUDES))

LOCAL_STATIC_LIBRARIES := gmp sodium

LOCAL_SRC_FILES += $(PROJECT_ROOT)/android/app/src/main/jni/com_stock_client_login_ClientBridge.c
LOCAL_SRC_FILES += $(PROJECT_ROOT)/android/app/src/main/jni/client_login.c
LOCAL_MODULE := login_client

include $(BUILD_SHARED_LIBRARY)
