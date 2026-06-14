import { useParams, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, FileText, Download, Link as LinkIcon, Calendar, User, FileSpreadsheet, File, VideoIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CourseQueryOptions } from "#/features/course-list/queries/courseQueries";
import api from "#/api";


interface CourseFile {
  id: number;
  title: string;
  description: string;
  file: {
    id: number;
    file_name: string;
    content_type: string;
    size: number;
  };
}

interface Section {
  id: number;
  title: string;
  resources: CourseFile[];

}

interface Course {
  id: number;
  name: string;
  code?: string;
  sections: Section[];
  teachers?: Array<{ first_name: string }>;
}

const typeConfig: Record<string, { icon: ReactNode; label: string; color: string }> = {
  "application/pdf": {
    icon: <FileText size={24} />,
    label: "PDF Document",
    color: "text-red-600 bg-red-50"
  },
  "sheet": {
    icon: <FileSpreadsheet size={24} />,
    label: "Spreadsheet",
    color: "text-green-600 bg-green-50"
  },
  "file": {
    icon: <File size={24} />,
    label: "Document",
    color: "text-blue-600 bg-blue-50"
  },
  "video/mp4": {
    icon: <VideoIcon size={24} />,
    label: "Video",
    color: "text-purple-600 bg-purple-50"
  },
  link: {
    icon: <LinkIcon size={24} />,
    label: "External Link",
    color: "text-purple-600 bg-purple-50"
  }
};

const getConfig = (contentType: string) => {
  if (contentType.includes("pdf")) return typeConfig["application/pdf"];
  if (contentType.includes("spreadsheetml") || contentType.includes("sheet")) 
    return typeConfig["sheet"];
  if (contentType.includes("file") || contentType.includes("word")) 
    return typeConfig["file"];
  if (contentType.includes("video")) return typeConfig["video/mp4"];
  return typeConfig["file"];
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export function ResourcePage() {
  const { courseId, resourceId } = useParams({ from: "/_app/course/$courseId/resource/$resourceId" });
  const { data: course } = useSuspenseQuery(CourseQueryOptions(courseId));
  const [isDownloading, setIsDownloading] = useState(false);


  const allCourseFiles = useMemo(() => {
    if (!course?.sections) return [];
    const files: (CourseFile & { sectionId: number })[] = [];
    for (const section of course.sections) {
      if (section.resources && Array.isArray(section.resources)) {
        for (const resource of section.resources) {
          files.push({
            ...resource,
            sectionId: section.id
          });
        }
      }
    }
    return files;
  }, [course]);


  const currentResource = allCourseFiles.find(f => f.id === Number(resourceId));


  const handleDownload = async () => {
    if (!currentResource) return;
    setIsDownloading(true);
    try {
      const response = await api.get(`/files/${currentResource.file.id}/stream`, {
        responseType: 'blob',
      });
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', currentResource.file.file_name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);

    } finally {
      setIsDownloading(false);
    }
  };

  if (!course || !currentResource) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">Resource not found</h2>
        <Link to="/course/$courseId" params={{ courseId }} className="text-blue-600 hover:underline">
          Return to Course
        </Link>
      </div>
    );
  }

  const config = getConfig(currentResource.file.content_type);
  const teacherName = course.teachers?.[0]?.first_name || "Course Instructor";

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        to="/course/$courseId"
        params={{ courseId }}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ChevronLeft size={20} />
        Назад к {course.name || "Course"}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-lg ${config.color}`}>
                {config.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-500">{config.label}</span>
                </div>
                <h1 className="text-2xl font-semibold">{currentResource.title}</h1>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{currentResource.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User size={16} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Author</p>
                  <p>{teacherName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">File name</p>
                  <p>{currentResource.file.file_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FileText size={16} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">File size</p>
                  <p>{formatFileSize(currentResource.file.size)}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button 
                className="gap-2" 
                onClick={handleDownload}
                disabled={isDownloading}
              >
                <Download size={16} />
                {isDownloading ? 'Downloading...' : 'Download'}
              </Button>
            </div>
          </div>
        </div>


        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="font-semibold">Course Resources</h2>
              <p className="text-sm text-gray-500">{allCourseFiles.length} files</p>
            </div>
            <div className="divide-y divide-gray-100">
              {allCourseFiles.map((r) => {
                const rConfig = getConfig(r.file.content_type);
                return (
                  <Link
                    key={r.id}
                    to="/course/$courseId/resource/$resourceId"
                    params={{ courseId, resourceId: String(r.id) }}
                    className={`flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors ${
                      r.id === currentResource.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                    }`}
                  >
                    <div className={`p-2 rounded ${rConfig.color} shrink-0`}>
                      {rConfig.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium line-clamp-2 ${r.id === currentResource.id ? 'text-blue-700' : 'text-gray-800'}`}>
                        {r.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{formatFileSize(r.file.size)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}