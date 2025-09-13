import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col items-center min-h-screen p-4 md:p-8 lg:p-12 overflow-hidden">
      <div className="w-full max-w-4xl text-center mt-16 md:mt-24">
        <Skeleton className="h-[72px] md:h-[96px] lg:h-[110px] w-3/4 mx-auto bg-white/10" />
        <Skeleton className="h-8 md:h-10 w-1/2 mx-auto mt-4 bg-white/10" />
      </div>

      <div className="w-full max-w-6xl mt-24 md:mt-32">
        {[...Array(3)].map((_, i) => (
          <section key={i} className="mb-16">
            <Skeleton className="h-12 w-48 mb-8 bg-white/10" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="flex flex-col space-y-3 p-4 border border-white/10 rounded-lg bg-card/30 h-[180px]">
                   <Skeleton className="h-5 w-[150px] bg-white/10" />
                   <div className="space-y-2 flex-grow">
                     <Skeleton className="h-4 w-full bg-white/10" />
                     <Skeleton className="h-4 w-[200px] bg-white/10" />
                   </div>
                   <div className="flex justify-between pt-2">
                     <Skeleton className="h-4 w-[50px] bg-white/10" />
                     <Skeleton className="h-4 w-[50px] bg-white/10" />
                   </div>
                 </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
