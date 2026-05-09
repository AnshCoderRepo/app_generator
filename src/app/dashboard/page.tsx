import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Heart, List, MapPin, GraduationCap, TrendingUp, ArrowRight, User } from "lucide-react";
import CollegeImage from "@/components/CollegeImage";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const savedColleges = await prisma.savedCollege.findMany({
    where: { userId: session.user.id },
    include: { college: true },
  });

  const savedComparisons = await prisma.savedComparison.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">My Student Portal</h1>
            <p className="text-slate-500 font-medium">Welcome back, {session.user.name || session.user.email}. Here are your saved items.</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
             <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600">
               <User size={24} />
             </div>
             <div className="flex flex-col">
               <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Account Type</span>
               <span className="font-bold text-slate-900">Student Explorer</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Saved Colleges */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-rose-500 p-2 rounded-xl shadow-lg shadow-rose-500/20">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">Saved Colleges</h2>
            </div>

            {savedColleges.length === 0 ? (
              <div className="bg-white rounded-[2.5rem] p-12 text-center border border-slate-200">
                <p className="text-slate-400 font-bold mb-6">You haven't saved any colleges yet.</p>
                <Link href="/" className="inline-flex items-center gap-2 text-sky-600 font-black uppercase tracking-widest text-sm hover:gap-3 transition-all">
                  Browse Institutions <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedColleges.map(({ college }: { college: any }) => (
                  <div key={college.id} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                    <div className="flex gap-6 relative z-10">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-100 shadow-inner">
                        <CollegeImage src={college.image || ''} alt={college.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <Link href={`/college/${college.id}`} className="font-black text-slate-900 hover:text-sky-600 transition-colors line-clamp-1 mb-1 text-lg">
                          {college.name}
                        </Link>
                        <div className="flex items-center gap-1 text-slate-400 text-xs font-bold mb-3">
                          <MapPin size={12} className="text-rose-500" />
                          {college.location}
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="bg-sky-50 text-sky-600 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest border border-sky-100">{college.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={20} className="text-slate-200" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Comparisons */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-sky-600 p-2 rounded-xl shadow-lg shadow-sky-600/20">
                <List className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">Comparisons</h2>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
              {savedComparisons.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-slate-400 font-bold">No saved comparisons.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {savedComparisons.map((comp: any) => (
                    <div key={comp.id} className="p-6 hover:bg-slate-50 transition-colors group">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-black text-slate-900 leading-tight group-hover:text-sky-600 transition-colors">{comp.name}</h3>
                        <span className="text-[10px] text-slate-400 font-black">{new Date(comp.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mb-4">{comp.collegeIds.length} Colleges compared</p>
                      <Link 
                        href={`/compare?ids=${comp.collegeIds.join(',')}`}
                        className="inline-flex items-center gap-2 text-[10px] font-black text-sky-600 uppercase tracking-widest hover:gap-3 transition-all"
                      >
                        View Comparison <ArrowRight size={12} />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
