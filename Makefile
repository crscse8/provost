all:
	docker build -t sofwerx/djangoforandroid .
	docker run -ti --rm -v $(PWD)/outputs/:/outputs djangoforandroid
