import java.math.BigInteger;
import java.util.List;

public class TestPhy {
	private static double phy; 
	public static void show(String str,List<String> sgLs){
		String str5 = Bstring.bstring(str);

		//System.out.println(str5);
		String s2 = ReStr.reStr(str5);
		if (str.startsWith("T")) {
			String strr = str.substring(9, 10);
			int m = Integer.parseInt(strr);

			for (int i = 0; i < sgLs.size(); i++) {
				// String value=new String();
				String value = sgLs.get(i);
				System.out.println(value);
				int a = value.indexOf('@');
				int b = value.indexOf(':');
				int c = value.indexOf('|');
				// System.out.println(a);

				if (value.charAt(a + 1) == '0') {
					// System.out.println("abc");
					// char c2=value.charAt(a-3);
					// int b=Integer.valueOf(c2);
					String str2 = value.substring(b + 1, c);
					int j = Integer.parseInt(str2.trim());

					if (7 >= j && j >= 0) {
						j = 7 - j;

					} else if (15 >= j && j >= 8) {
						j = 23 - j;
					} else if (23 >= j && j >= 16) {
						j = 39 - j;
					} else if (31 >= j && j >= 24) {
						j = 55 - j;
					} else if (39 >= j && j >= 32) {
						j = 71 - j;
					} else if (47 >= j && j >= 40) {
						j = 87 - j;
					} else if (55 >= j && j >= 48) {
						j = 103 - j;
					} else {
						j = 119 - j;
					}
					String str4 = value.substring(c + 1, a);
					int h = Integer.parseInt(str4.trim());
					// String str5=Bstring.bstring(str);
					if (j + h <= m * 8) {
						String str6 = str5.substring(j, j + h);

						//System.out.println(str6);

						// StringBuilder st=new StringBuilder(str6);

						BigInteger src1 = new BigInteger(str6, 2);
						String f = src1.toString();
						int n = Integer.parseInt(f);
						//System.out.println(n);
						int a1 = value.indexOf('(');
						int a2 = value.indexOf(')');
						String str1 = value.substring(a1 + 1, a2);
						//System.out.println(str1);
						String[] strArray = null;
						strArray = str1.split(","); // 拆分字符为","
													// ,然后把结果交给数组strArray
						// System.out.println(strArray[1]);
						String s1 = strArray[0];
						double d1 = Double.parseDouble(s1);
						// System.out.println(d1);
						String s3 = strArray[1];
						double d2 = Double.parseDouble(s3);
					    phy = d1 * n + d2;
					    
						System.out.println(phy);
						// System.out.println(j);

						// System.out.println(c2);
						// char c3=value.charAt(a-1);
					}

				} else if (value.charAt(a + 1) == '1') {
					String str3 = value.substring(b + 1, c);
					// System.out.println(str2);
					int d = Integer.parseInt(str3.trim());
					d = 63 - d;
					String str4 = value.substring(c + 1, a);
					int e = Integer.parseInt(str4.trim());
					// Bstring bs=new Bstring();
					// String str5=Bstring.bstring(str);

					//System.out.println(s2);
					if (64 - d <= m * 8) {
						String str6 = s2.substring(d - e + 1, d + 1);
						//System.out.println(str6);
						// StringBuilder st=new StringBuilder(str6);
						// StringBuilder str7=st.reverse();
						// String s1=str7.toString().toLowerCase();
						// System.out.println(s1);
						BigInteger src1 = new BigInteger(str6, 2);
						String j = src1.toString();
						//System.out.println(j);
						int i1 = Integer.parseInt(j);

						int a1 = value.indexOf('(');
						int a2 = value.indexOf(')');
						String str1 = value.substring(a1 + 1, a2);
						//System.out.println(str1);
						String[] strArray = null;
						strArray = str1.split(","); // 拆分字符为","
													// ,然后把结果交给数组strArray
						// System.out.println(strArray[1]);
						String s1 = strArray[0];
						double d1 = Double.parseDouble(s1);
						// System.out.println(d1);
						String s3 = strArray[1];
						double d2 = Double.parseDouble(s3);
						 phy = d1 * i1 + d2;
						 System.out.println(phy);
						/*
						 * int[] b1 = new int[s1.length()]; for(int k = 0; k <
						 * s1.length(); k++) {
						 * //先由字符串转换成char,再转换成String,然后Integer
						 * 
						 * b1[k] = Integer.parseInt(
						 * String.valueOf(s1.charAt(k)));
						 * 
						 * }
						 */

						// int b1=Integer.parseInt(s1.trim());
						// System.out.println(b1);
						/*
						 * char[] chs = new char[5]; for (int h= 0; h<
						 * str1.length(); h++) { if(h>=0&&h<=5){ chs[h] =
						 * str1.charAt(h); } } System.out.println(chs[0]);
						 */
						// System.out.println("asd");
						// char c2=value.charAt(a-3);
						// int b=Integer.valueOf(c2);
						// System.out.println(c2);
						// char c3=value.charAt(a-1);
						// int c=Integer.valueOf(c3);
					}
				}
			}
		}
		if (str.startsWith("t")) {
			String strr = str.substring(4, 5);
			int m = Integer.parseInt(strr);

			for (int i = 0; i < sgLs.size(); i++) {
				// String value=new String();
				String value = sgLs.get(i);
				System.out.println(value);
				int a = value.indexOf('@');
				int b = value.indexOf(':');
				int c = value.indexOf('|');
				// System.out.println(a);

				if (value.charAt(a + 1) == '0') {
					// System.out.println("abc");
					// char c2=value.charAt(a-3);
					// int b=Integer.valueOf(c2);
					String str2 = value.substring(b + 1, c);
					int j = Integer.parseInt(str2.trim());

					if (7 >= j && j >= 0) {
						j = 7 - j;

					} else if (15 >= j && j >= 8) {
						j = 23 - j;
					} else if (23 >= j && j >= 16) {
						j = 39 - j;
					} else if (31 >= j && j >= 24) {
						j = 55 - j;
					} else if (39 >= j && j >= 32) {
						j = 71 - j;
					} else if (47 >= j && j >= 40) {
						j = 87 - j;
					} else if (55 >= j && j >= 48) {
						j = 103 - j;
					} else {
						j = 119 - j;
					}
					String str4 = value.substring(c + 1, a);
					int h = Integer.parseInt(str4.trim());
					// String str5=Bstring.bstring(str);
					if (j + h <= m * 8) {
						String str6 = str5.substring(j, j + h);

						//System.out.println(str6);

						// StringBuilder st=new StringBuilder(str6);

						BigInteger src1 = new BigInteger(str6, 2);
						String f = src1.toString();
						int n = Integer.parseInt(f);
						//System.out.println(n);
						int a1 = value.indexOf('(');
						int a2 = value.indexOf(')');
						String str1 = value.substring(a1 + 1, a2);
						//System.out.println(str1);
						String[] strArray = null;
						strArray = str1.split(","); // 拆分字符为","
													// ,然后把结果交给数组strArray
						// System.out.println(strArray[1]);
						String s1 = strArray[0];
						double d1 = Double.parseDouble(s1);
						// System.out.println(d1);
						String s3 = strArray[1];
						double d2 = Double.parseDouble(s3);
						 phy = d1 * n + d2;
						
						System.out.println(phy);
						// System.out.println(j);

						// System.out.println(c2);
						// char c3=value.charAt(a-1);
					}else{
						System.out.println("Error");
					}

				} else if (value.charAt(a + 1) == '1') {
					String str3 = value.substring(b + 1, c);
					// System.out.println(str2);
					int d = Integer.parseInt(str3.trim());
					d = 63 - d;
					String str4 = value.substring(c + 1, a);
					int e = Integer.parseInt(str4.trim());
					

					//System.out.println(s2);
					if (64 - d <= m * 8) {
						String str6 = s2.substring(d - e + 1, d + 1);
						//System.out.println(str6);
						// StringBuilder st=new StringBuilder(str6);
						// StringBuilder str7=st.reverse();
						// String s1=str7.toString().toLowerCase();
						// System.out.println(s1);
						BigInteger src1 = new BigInteger(str6, 2);
						String j = src1.toString();
						//System.out.println(j);
						int i1 = Integer.parseInt(j);

						int a1 = value.indexOf('(');
						int a2 = value.indexOf(')');
						String str1 = value.substring(a1 + 1, a2);
						//System.out.println(str1);
						String[] strArray = null;
						strArray = str1.split(","); // 拆分字符为","
													// ,然后把结果交给数组strArray
						// System.out.println(strArray[1]);
						String s1 = strArray[0];
						double d1 = Double.parseDouble(s1);
						// System.out.println(d1);
						String s3 = strArray[1];
						double d2 = Double.parseDouble(s3);
						 phy = d1 * i1 + d2;
						System.out.println(phy);

					}
				}
			}
		}
	}

	

	}


