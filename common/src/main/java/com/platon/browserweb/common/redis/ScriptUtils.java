/*
 * Copyright (c) 2018. juzix.io. All rights reserved.
 */

package com.platon.browserweb.common.redis;

/**
 * Created by IntelliJ IDEA.
 *
 * @author: CK
 * @date: 2018/5/31
 */
public class ScriptUtils {
    /**
     * Checks whether given {@link Throwable} contains a {@code NOSCRIPT} error. {@code NOSCRIPT} is reported if a script
     * was attempted to execute using {@code EVALSHA}.
     *
     * @param e the exception.
     * @return {@literal true} if the exception or one of its causes contains a {@literal NOSCRIPT} error.
     */
    public static boolean exceptionContainsNoScriptError(Throwable e) {

        Throwable current = e;
        while (current != null) {

            String exMessage = current.getMessage();
            if (exMessage != null && exMessage.contains("NOSCRIPT")) {
                return true;
            }

            current = current.getCause();
        }

        return false;
    }
}
