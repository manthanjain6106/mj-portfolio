import mongoose from "mongoose";
import * as fs from "fs";
import * as path from "path";
import { seedProjects } from "../content/projects.seed";

// Load environment variables from .env.local if not already in process.env
function loadEnvLocal() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const equalsIdx = trimmed.indexOf("=");
      if (equalsIdx !== -1) {
        const key = trimmed.slice(0, equalsIdx).trim();
        let val = trimmed.slice(equalsIdx + 1).trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

async function runSeed() {
  loadEnvLocal();

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error(
      "\n[Seed Error] MONGODB_URI is not set. Please add MONGODB_URI to .env.local before running the seed script.\n"
    );
    process.exit(1);
  }

  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(uri);

  // Define minimal inline schema to avoid module alias resolution issues in standalone scripts
  const ProjectSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      slug: { type: String, required: true, unique: true },
      summary: { type: String, required: true },
      problem: { type: String, required: true },
      solution: { type: String, required: true },
      role: { type: String, required: true },
      techStack: { type: [String], required: true },
      category: { type: String, required: true },
      images: [
        {
          url: String,
          publicId: String,
          alt: String,
        },
      ],
      liveUrl: String,
      repoUrl: String,
      featured: { type: Boolean, default: false },
      order: { type: Number, default: 0 },
      status: { type: String, enum: ["draft", "published"], default: "draft" },
    },
    { timestamps: true }
  );

  const ProjectModel =
    mongoose.models.Project || mongoose.model("Project", ProjectSchema);

  console.log(
    `Found ${seedProjects.length} seed projects. Importing as DRAFT...`
  );

  let insertedCount = 0;
  let updatedCount = 0;

  for (const item of seedProjects) {
    const projectData = {
      title: item.title,
      slug: item.slug,
      summary: item.summary,
      problem: item.problem,
      solution: item.solution,
      role: item.role,
      techStack: item.techStack,
      category: item.category,
      images: item.images,
      liveUrl: item.liveUrl.startsWith("http") ? item.liveUrl : undefined,
      repoUrl: item.repoUrl.startsWith("http") ? item.repoUrl : undefined,
      featured: item.featured,
      order: item.order,
      // Imported strictly as DRAFT per Phase 4 requirements
      status: "draft",
    };

    const existing = await ProjectModel.findOne({ slug: item.slug });
    if (existing) {
      await ProjectModel.updateOne({ slug: item.slug }, projectData);
      console.log(
        `  ✓ Updated existing project: "${item.title}" (${item.slug}) -> status: draft`
      );
      updatedCount++;
    } else {
      await ProjectModel.create(projectData);
      console.log(
        `  + Created draft project: "${item.title}" (${item.slug}) -> status: draft`
      );
      insertedCount++;
    }
  }

  console.log(
    `\nSeed finished successfully! (${insertedCount} created, ${updatedCount} updated).`
  );
  console.log(
    "You can now manage and edit these projects in the /admin/projects portal."
  );

  await mongoose.disconnect();
}

runSeed().catch((err) => {
  console.error("Seed execution failed:", err);
  process.exit(1);
});
