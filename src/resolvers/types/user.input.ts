import { Length, Matches, Max, Min } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

const alphaLatin = {
  re: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
  msg: 'Only alphabetic characters with accents are allowed.',
};

@InputType()
export class UserInput {
  @Field()
  @Matches(alphaLatin.re, { message: alphaLatin.msg })
  @Length(3, 50)
  firstName: string;

  @Field()
  @Matches(alphaLatin.re, { message: alphaLatin.msg })
  @Length(3, 50)
  lastName: string;

  @Field(type => Int, { nullable: true })
  @Min(18)
  @Max(100)
  age?: number;
}
