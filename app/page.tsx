"use client"

import { Popover } from "@headlessui/react"
import { useTheme } from "next-themes"
import GitHubCalendar from "react-github-calendar"
import Image from "@/components/Image"
import SocialIcon from "@/components/social-icons"

/**
 * @description 个人主页
 * @author EricYuan
 * @date 2025-06-07
 */
const HomePage = () => {
	const { resolvedTheme } = useTheme()

	return (
		<>
			<div className="divide-y divide-gray-200 dark:divide-gray-700">
				<div>
					<div className="flex flex-col items-center pt-8">
						<Image
							src="/static/images/avatar.png"
							alt="avatar"
							width={192}
							height={192}
							className="h-24 w-24 rounded-full sm:h-36 sm:w-36 md:h-48 md:w-48"
						/>
						<div className="pt-4 text-2xl font-bold">EricYuan</div>
						<div className="text-gray-500 dark:text-gray-400">{"Full Stack Developer"}</div>
						<div className="text-gray-500 dark:text-gray-400">{"海管家"}</div>
						<div className="flex scale-75 gap-4 pt-6">
							<SocialIcon kind="mail" href="mailto:twotwoba@126.com" />
							<SocialIcon kind="github" href="https://github.com/twotwoba" />
							<SocialIcon kind="x" href="https://x.com/EricYuansz" />
							<Popover>
								<Popover.Button className="focus-visible:outline-none">
									<SocialIcon kind="wechat" href="#" />
								</Popover.Button>
								<Popover.Panel className="absolute -left-[34%] z-10 w-[300px]">
									<div className="flex items-center justify-center">
										<Image
											src="/static/images/wechat.png"
											alt="wechat"
											width={256}
											height={256}
											className="w-[20rem]"
										/>
									</div>
								</Popover.Panel>
							</Popover>
						</div>
					</div>
					<div className="flex justify-center pt-4">
						<GitHubCalendar
							username="twotwoba"
							fontSize={12}
							errorMessage=""
							colorScheme={
								resolvedTheme !== "system" ? (resolvedTheme as "light" | "dark") : undefined
							}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default HomePage
