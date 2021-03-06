#include <jni.h>
#include "client_login.h"

JNIEXPORT jint JNICALL Java_com_stocknotifier_ClientLoginModule_jni_1init_1client_1lib
(JNIEnv * env, jclass l) {
  return init_client_lib();
}

JNIEXPORT jint JNICALL Java_com_stocknotifier_ClientLoginModule_jni_1lib_1bytes_1size
(JNIEnv * env, jclass l) {
  return lib_bytes_size();
}

JNIEXPORT jint JNICALL Java_com_stocknotifier_ClientLoginModule_jni_1lib_1hash_1size
(JNIEnv * env, jclass l) {
  return lib_hash_size();
}

JNIEXPORT jint JNICALL Java_com_stocknotifier_ClientLoginModule_jni_1lib_1key_1size
(JNIEnv * env, jclass l) {
  return lib_key_size();
}

JNIEXPORT jobject JNICALL Java_com_stocknotifier_ClientLoginModule_jni_1generate_1registration
(JNIEnv * env, jclass l, jstring up) {
  const char* user_pass = (*env)->GetStringUTFChars(env, up, NULL);
  const int size = lib_bytes_size();

  unsigned char s[size];
  unsigned char v[size];
  if (generate_registration(user_pass, s, v)) {
    return NULL;
  }

  jbyteArray s_array = (*env)->NewByteArray(env, size);
  (*env)->SetByteArrayRegion(env, s_array, 0, size, (jbyte*) s);

  jbyteArray v_array = (*env)->NewByteArray(env, size);
  (*env)->SetByteArrayRegion(env, v_array, 0, size, (jbyte*) v);

  jclass r_ret_class = (*env)->FindClass(env, "com/stocknotifier/RegistrationValues");
  jmethodID construct = (*env)->GetMethodID(env, r_ret_class, "<init>", "([B[B)V");
  jobject retval = (*env)->NewObject(env, r_ret_class, construct, s_array, v_array);
  return retval;
}

JNIEXPORT jobject JNICALL Java_com_stocknotifier_ClientLoginModule_jni_1generate_1a
(JNIEnv * env, jclass l) {
  const int size = lib_bytes_size();

  unsigned char a[size];
  unsigned char A[size];
  if (generate_a(a, A)) {
    return NULL;
  }

  jbyteArray a_array = (*env)->NewByteArray(env, size);
  (*env)->SetByteArrayRegion(env, a_array, 0, size, (jbyte*) a);

  jbyteArray A_array = (*env)->NewByteArray(env, size);
  (*env)->SetByteArrayRegion(env, A_array, 0, size, (jbyte*) A);

  jclass r_ret_class = (*env)->FindClass(env, "com/stocknotifier/AValues");
  jmethodID construct = (*env)->GetMethodID(env, r_ret_class, "<init>", "([B[B)V");
  jobject retval = (*env)->NewObject(env, r_ret_class, construct, a_array, A_array);
  return retval;
}


JNIEXPORT jobject JNICALL Java_com_stocknotifier_ClientLoginModule_jni_1generate_1ck
(JNIEnv * env, jclass c,
 jstring un,
 jstring up,
 jbyteArray aArray,
 jbyteArray AArray,
 jbyteArray BArray,
 jbyteArray sArray,
 jbyteArray nArray) {
  const int size = lib_hash_size();
  const int key_size = lib_key_size();
  const char* user_pass = (*env)->GetStringUTFChars(env, up, NULL);
  const char* username = (*env)->GetStringUTFChars(env, un, NULL);

  jbyte* a = (*env)->GetByteArrayElements(env, aArray, NULL);
  jbyte* A = (*env)->GetByteArrayElements(env, AArray, NULL);
  jbyte* B = (*env)->GetByteArrayElements(env, BArray, NULL);
  jbyte* s = (*env)->GetByteArrayElements(env, sArray, NULL);
  jbyte* n = (*env)->GetByteArrayElements(env, nArray, NULL);

  unsigned char sk[key_size];
  unsigned char m1[size];
  unsigned char m2[size];
  unsigned char hv[key_size];

  if (generate_ck(username, user_pass, (unsigned char*) a, (unsigned char*) A,
                  (unsigned char*) B, (unsigned char*) s, (unsigned char*) n,
                  sk, m1, m2, hv)) {
    return NULL;
  }

  (*env)->ReleaseByteArrayElements(env, aArray, a, 0);
  (*env)->ReleaseByteArrayElements(env, AArray, A, 0);
  (*env)->ReleaseByteArrayElements(env, BArray, B, 0);
  (*env)->ReleaseByteArrayElements(env, sArray, s, 0);
  (*env)->ReleaseByteArrayElements(env, nArray, n, 0);

  jbyteArray sk_array = (*env)->NewByteArray(env, key_size);
  (*env)->SetByteArrayRegion(env, sk_array, 0, key_size, (jbyte*) sk);

  jbyteArray m1_array = (*env)->NewByteArray(env, size);
  (*env)->SetByteArrayRegion(env, m1_array, 0, size, (jbyte*) m1);

  jbyteArray m2_array = (*env)->NewByteArray(env, size);
  (*env)->SetByteArrayRegion(env, m2_array, 0, size, (jbyte*) m2);

  jbyteArray hv_array = (*env)->NewByteArray(env, key_size);
  (*env)->SetByteArrayRegion(env, hv_array, 0, key_size, (jbyte*) hv);

  jclass r_ret_class = (*env)->FindClass(env, "com/stocknotifier/VerificationValues");
  jmethodID construct = (*env)->GetMethodID(env, r_ret_class, "<init>", "([B[B[B[B)V");
  jobject retval = (*env)->NewObject(env, r_ret_class, construct, sk_array, m1_array, m2_array, hv_array);

  return retval;
}
