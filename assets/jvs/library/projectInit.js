/**
 * Fire project init done
 */
sky.exec(function() {
    document.body.classList.remove("hidden");
	sky.servicesDeferred.resolve();
    sky.projectDeffered.resolve();
});