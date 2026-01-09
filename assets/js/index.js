
var navLinks = document.querySelectorAll(".nav-link");
var sections = document.querySelectorAll(".app-section");

navLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    var sectionId = this.getAttribute("data-section");

    sections.forEach(function (section) {
      section.classList.add("hidden");
    });

    document.getElementById(sectionId).classList.remove("hidden");

    navLinks.forEach(function (l) {
      l.classList.remove("bg-blue-500/10", "text-blue-400");
      l.classList.add("text-slate-300");
    });

    this.classList.add("bg-blue-500/10", "text-blue-400");
    this.classList.remove("text-slate-300");
  });
});

getLaunches();


async function getLaunches() {
  var response = await fetch(
    "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10"
  );

  var data = await response.json();
  var launches = data.results;

  var featured = launches[0];

  document.getElementById("featured-launch").innerHTML = `
    <div class="bg-slate-800/50 border border-slate-700 rounded-3xl p-8">
      <span class="text-green-400 font-semibold">${featured.status.name}</span>

      <h3 class="text-3xl font-bold mt-2 mb-4">
        ${featured.name}
      </h3>

      <p class="text-slate-400 mb-2">
        <i class="fas fa-building"></i>
        ${featured.launch_service_provider.name}
      </p>

      <p class="text-slate-400 mb-4">
        <i class="fas fa-rocket"></i>
        ${featured.rocket.configuration.name}
      </p>

      <p class="text-slate-300 mb-4">
        ${featured.mission ? featured.mission.description : "No description"}
      </p>

      <p class="text-slate-400">
        <i class="fas fa-calendar"></i>
        ${new Date(featured.net).toDateString()}
      </p>
    </div>
  `;

  var gridHTML = "";

  for (var i = 1; i < launches.length; i++) {
    var l = launches[i];

    gridHTML += `
      <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
        <span class="text-xs text-green-400 font-semibold">
          ${l.status.name}
        </span>

        <h4 class="font-bold text-lg mt-2 mb-2">
          ${l.name}
        </h4>

        <p class="text-sm text-slate-400 mb-1">
          <i class="fas fa-building"></i>
          ${l.launch_service_provider.name}
        </p>

        <p class="text-sm text-slate-400 mb-1">
          <i class="fas fa-rocket"></i>
          ${l.rocket.configuration.name}
        </p>

        <p class="text-sm text-slate-400">
          <i class="fas fa-calendar"></i>
          ${new Date(l.net).toDateString()}
        </p>
      </div>
    `;
  }

  document.getElementById("launches-grid").innerHTML = gridHTML;
}


// these api(s) https://api.nasa.gov/planetary/apod?api_key=sbPqntpo70agLTf806rGDlAsgc2PAYPd76AeY5cx and  https://api.nasa.gov/planetary/apod?api_key=sbPqntpo70agLTf806rGDlAsgc2PAYPd76AeY5cx&date=2025-12-01 
//are giving error 504 
//and this api https://solar-system-opendata-proxy.vercel.app/api/planets gave error 500 
//they didn't work neither on browers nor on postman