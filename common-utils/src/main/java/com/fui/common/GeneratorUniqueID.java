package com.fui.common;

import java.util.UUID;

/**
 * @Title 生成唯一ID
 * @Author sf.xiong on 2017/11/23.
 */
public class GeneratorUniqueID {
    private static String[] chars = new String[]{"a", "b", "c", "d", "e", "f",
            "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
            "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5",
            "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I",
            "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
            "W", "X", "Y", "Z"};

    /**
     * 基于UUID类生成唯一短码
     *
     * @return
     */
    public static String createToken() {
        StringBuilder shortBuffer = new StringBuilder();
        String uuid = UUID.randomUUID().toString().replace("-", "");
        String distributedId = getDistributedId(); //四位长度
        int length = 8; //生成Token默认长度
        if (StringUtils.isNotEmpty(distributedId)) {
            uuid = uuid + distributedId;
            length = 9; //支持分布式环境生成Token为9位
        }
        for (int i = 0; i < length; i++) {
            String str = uuid.substring(i * 4, i * 4 + 4);
            int x = Integer.parseInt(str, 16);
            shortBuffer.append(chars[x % 0x3E]);
        }
        return shortBuffer.toString();
    }

    /**
     * 获取环境变量 适用于分布式环
     *
     * @return
     */
    public static String getDistributedId() {
        String id = CommonConfiguration.getValue(CommonConstants.CONFIG_ENV_SERVER_ID, "");
        int pos = 4; //四位服务器编码
        int len = id.length();
        if (StringUtils.isNotEmpty(id) && len < pos) {
            int remaining = pos - len;
            StringBuilder str = new StringBuilder();
            for (int i = 0; i < remaining; i++) {
                str.append("0");
            }
            str.append(id);
        }
        return id;
    }
}

