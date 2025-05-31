import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get deployment information from environment variables
    const deploymentInfo = {
      // Vercel automatically sets these environment variables
      vercelUrl: process.env.VERCEL_URL,
      vercelGitCommitSha: process.env.VERCEL_GIT_COMMIT_SHA,
      vercelGitCommitMessage: process.env.VERCEL_GIT_COMMIT_MESSAGE,
      vercelGitCommitAuthorName: process.env.VERCEL_GIT_COMMIT_AUTHOR_NAME,
      vercelGitRepoSlug: process.env.VERCEL_GIT_REPO_SLUG,
      vercelGitRepoOwner: process.env.VERCEL_GIT_REPO_OWNER,
      vercelGitProvider: process.env.VERCEL_GIT_PROVIDER,
      vercelGitCommitRef: process.env.VERCEL_GIT_COMMIT_REF,
      vercelGitPullRequestId: process.env.VERCEL_GIT_PULL_REQUEST_ID,

      // Additional info
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),

      // Short commit hash for easier reading
      shortCommitSha: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7),
    }

    return NextResponse.json({
      success: true,
      deployment: deploymentInfo,
      message: "CPABee deployment information",
    })
  } catch (error) {
    console.error("Error getting version info:", error)
    return NextResponse.json({
      success: false,
      error: "Failed to get deployment information",
    })
  }
}
