import { readFileSync } from "node:fs"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { clampParam } from "../params"

const archivoSemiBold = readFileSync(
  join(process.cwd(), "src/assets/fonts/Archivo-SemiBold.ttf")
)

const plexMonoRegular = readFileSync(
  join(process.cwd(), "src/assets/fonts/IBMPlexMono-Regular.ttf")
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const title = clampParam(searchParams.get("title"), 160)
  const description = clampParam(searchParams.get("description"), 320)

  return new ImageResponse(
    <div tw="flex h-full w-full bg-[#070c14] text-[#e6edf5]">
      <div tw="absolute inset-y-0 left-12 flex w-px border border-[#1b2b3f]" />
      <div tw="absolute inset-y-0 right-12 flex w-px border border-[#1b2b3f]" />
      <div tw="absolute inset-x-0 top-12 flex h-px border border-[#1b2b3f]" />
      <div tw="absolute inset-x-0 bottom-12 flex h-px border border-[#1b2b3f]" />

      <div tw="absolute top-18 left-18 flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 256"
          width={128}
          height={64}
        >
          <path
            fill="currentColor"
            d="M192 256H64v-64h128v64ZM448 64H320v128h128v64H256V0h192v64ZM64 192H0V64h64v128ZM512 192h-64V64h64v128ZM192 64H64V0h128v64Z"
          />
        </svg>
      </div>

      <div tw="absolute inset-x-0 top-40 bottom-24 flex flex-col justify-end border-t-2 border-[#1b2b3f]">
        <div
          tw="border-t-2 border-b-2 border-[#1b2b3f] px-18"
          style={{
            fontFamily: "Archivo",
            fontWeight: 600,
            fontSize: 64,
            lineHeight: 1,
            textWrap: "balance",
            letterSpacing: "-0.035em",
          }}
        >
          {title}
        </div>

        {description && (
          <div tw="flex flex-col">
            <div
              tw="border-b-2 border-[#1b2b3f] px-18 py-8 text-[#a9bcd0]"
              style={{
                fontFamily: "IBM Plex Mono",
                fontWeight: 400,
                fontSize: 32,
                lineHeight: 1.25,
                textWrap: "balance",
              }}
            >
              {description}
            </div>
          </div>
        )}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Archivo",
          data: archivoSemiBold,
          weight: 600,
        },
        {
          name: "IBM Plex Mono",
          data: plexMonoRegular,
          weight: 400,
        },
      ],
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=31536000, immutable",
      },
    }
  )
}
