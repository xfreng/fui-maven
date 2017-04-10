package com.fui.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class FileUtils {

	public static void createDir(String path) {
		File file = new File(path);
		if (!file.isDirectory()) {
			file.mkdirs();
		}
	}

	/**
	 * 
	 * @param srcfile
	 *            文件名数组
	 * @param zipfile
	 *            压缩后文件
	 */
	public static void ZipFiles(File[] srcfile, File zipfile) {
		byte[] buf = new byte[1024];
		try {
			ZipOutputStream out = new ZipOutputStream(new FileOutputStream(zipfile));
			for (int i = 0, count = srcfile.length; i < count; i++) {
				File sourceFile = srcfile[i];
				InputStream in = new FileInputStream(sourceFile);
				out.putNextEntry(new ZipEntry(sourceFile.getName()));
				int len;
				while ((len = in.read(buf)) > 0) {
					out.write(buf, 0, len);
				}
				out.closeEntry();
				in.close();
			}
			out.close();
			// 删除打包源文件
			for (int i = 0, count = srcfile.length; i < count; i++) {
				File sourceFile = srcfile[i];
				sourceFile.delete();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}