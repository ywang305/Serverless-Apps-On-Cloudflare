import { Button } from "@/components/Button";

export default function Home() {
  return (
    <section className="min-h-screen">
      <div className="container mx-auto py-5 h-full">
        <div className="flex justify-center items-center h-full">
          <div className="w-full max-w-md">
            <h3 className="mb-4 pb-2 font-normal">
              Check the weather forecast now
            </h3>
            <div className="input-group rounded mb-3">
              <select
                className="form-control rounded text-black"
                aria-label="Search"
                aria-describedby="search-addon"
                id="location-select"
              >
                <option value="london">London, UK</option>
                <option value="new-york">New York, US</option>
                <option value="los-angeles">Los Angeles, US</option>
                <option value="berlin">Berlin, Germany</option>
                <option value="tokyo">Tokyo, Japan</option>
              </select>
            </div>
            <Button />
          </div>
        </div>
      </div>
    </section>
  );
}
