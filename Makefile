all: .virtualenv
	. .virtualenv/bin/activate && \
	pip3 install -r requirements.txt && \
	python3 manage.py migrate && \
	python3 manage.py runserver

.virtualenv:
	which virtualenv || pip3 install virtualenv
	virtualenv --python=python3 .virtualenv

requirements.txt: .virtualenv
	. .virtualenv/bin/activate && \
	pip3 freeze > requirements.txt
	
apk:
	docker build -t sofwerx/djangoforandroid .
	docker run -ti --rm -v $(PWD)/outputs/:/outputs djangoforandroid

