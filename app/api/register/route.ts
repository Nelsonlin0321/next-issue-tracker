import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import z from "zod";

const passwordSchema = z
  .string()
  .min(1, "password is required")
  .min(6, "password must have than 6 characters");

const userSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: passwordSchema,
  confirmedPassword: passwordSchema,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);
    const { email, username, password, confirmedPassword } =
      userSchema.parse(body);
    if (!email || !username || !password || !confirmedPassword) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    if (password !== confirmedPassword) {
      return NextResponse.json(
        {
          message: "The two passwords are inconsistent",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        {
          message: "The user with the email already existed",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: hashedPassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json({
      user: rest,
      message: "User is created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}
