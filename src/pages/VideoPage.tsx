import { useParams, Link } from "@tanstack/react-router";
import { ChevronLeft, Clock, ChevronDown, ChevronUp, Play } from "lucide-react";
import { useState, useRef } from "react";
import { useQueries, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { VideosQueryOptions } from "#/features/videos/queries/videoQuery";
import { CourseQueryOptions } from "#/features/course-list/queries/courseQueries";

export function VideoPage() {
  const { videoId } = useParams({ from: "/_app/course/$courseId/video/$videoId" });
  const courseId = "1"
  const { data: videos } = useSuspenseQuery(VideosQueryOptions(courseId));
  const course = useQuery(CourseQueryOptions(courseId))

  const video = videos[0];

  const [showTranscript, setShowTranscript] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!video) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">Video not found</h2>
        <Link to="/course/$courseId" params={{ courseId }} className="text-blue-600 hover:underline">
          Return to Course
        </Link>
      </div>
    );
  }

  const courseVideos = videos.filter(v => v.courseId === courseId);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">

      <Link
        to="/course/$courseId"
        params={{ courseId }}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ChevronLeft size={20} />

      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">

          <div className="bg-black rounded-lg overflow-hidden shadow-lg mb-4 aspect-video relative group">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={video.video_url} />
              Your browser does not support the video tag.
            </video>
          </div>


          <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
            <div className="flex items-start justify-between mb-3">
              <h1 className="text-2xl font-semibold flex-1 mr-4">{video.title}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500 shrink-0">
                <Clock size={16} />
                <span>{video.duration}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{video.description}</p>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className={`bg-blue-500 text-white px-3 py-1 rounded-full`}>
                {course?.id}
              </span>
              <span>{course?.instructor}</span>
            </div>
          </div>


          {video.transcript && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                onClick={() => setShowTranscript(!showTranscript)}
              >
                <span className="font-semibold">Transcript</span>
                {showTranscript ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {showTranscript && (
                <div className="px-6 pb-6 border-t border-gray-200">
                  <div className="bg-gray-50 rounded-lg p-4 mt-4 max-h-80 overflow-y-auto">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                      {video.transcript}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>


        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="font-semibold">Course Videos</h2>
              <p className="text-sm text-gray-500">{courseVideos.length} videos</p>
            </div>
            <div className="divide-y divide-gray-100 max-h-[calc(100vh-200px)] overflow-y-auto">
              {courseVideos.map((v) => (
                <Link
                  key={v.id}
                  to="/course/$courseId/video/$videoId"
                  params={{ courseId, videoId: v.id }}
                  className={`flex gap-3 p-3 hover:bg-gray-50 transition-colors ${v.id === videoId ? 'bg-blue-50 border-l-4 border-blue-600' : ''}`}
                >
                  <div className="relative shrink-0 w-24 h-16 rounded overflow-hidden bg-gray-200">
                    <img
                      src={v.thumbnailUrl}
                      alt={v.title}
                      className="w-full h-full object-cover"
                    />
                    {v.id !== videoId && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play size={16} className="text-white fill-white" />
                      </div>
                    )}
                    {v.id === videoId && (
                      <div className="absolute inset-0 flex items-center justify-center bg-blue-600/60">
                        <Play size={16} className="text-white fill-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium line-clamp-2 ${v.id === videoId ? 'text-blue-700' : 'text-gray-800'}`}>
                      {v.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Clock size={12} />
                      {v.duration}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
